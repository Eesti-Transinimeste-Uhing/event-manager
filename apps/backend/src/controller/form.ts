import { DeepPartial } from 'typeorm'
import { renderJsonContent, Utils } from '@etu/tiptap'
import { SupportedLanguages } from '@etu/events-proto/dist/lib'

import { AppDataSource } from '../data-source'
import { Form } from '../entity/form'
import { FormRepository } from '../repository/form'
import { EntityNotFoundError, FormSubmissionLimitExceededError } from '../lib/errors'
import { FormSubmission, FormSubmissionData } from '../entity/form-submission'
import { FormSubmissionRepository } from '../repository/form-submission'
import { formBanners } from '../storage'
import { RenderTarget } from '@etu/tiptap/src/render'
import { PaginateAndSortArgs } from '../lib/pagination'
import { TemplateRepository } from '../repository/template'
import { substituteTemplateVariables } from '@etu/tiptap/src/utils'
import { flagMap } from '@etu/i18n'

export enum FormSubmittabilityTag {
  SubmitLimitReached,
  AlreadySubmitted,
  FormDoesNotExist,
}

type FormSubmittability = {
  submittable: boolean
  tags: FormSubmittabilityTag[]
}

export class FormController {
  private manager = AppDataSource.createEntityManager()

  private templates = this.manager.withRepository(TemplateRepository)

  private forms = this.manager.withRepository(FormRepository)

  private submissions = this.manager.withRepository(FormSubmissionRepository)

  public async count() {
    return await this.forms.count()
  }

  public async listAll() {
    return await this.forms.find()
  }

  public async getById(id: string) {
    return await this.forms.findOneBy({ id })
  }

  public async paginate(args: PaginateAndSortArgs) {
    return await this.forms.paginate(args)
  }

  public async getBanner(id: string) {
    return await formBanners.get(id)
  }

  public async paginateSubmissions(args: PaginateAndSortArgs) {
    return await this.submissions.paginate(args)
  }

  public async softRemove(id: string) {
    await this.manager.transaction(async (manager) => {
      await manager.softRemove(Form, { id })
    })

    return true
  }

  public async hasReachedSubmissionLimit(form: Form) {
    const submissionCount = await this.submissions.countByFormId(form.id)

    return form.submitLimit === 0 || submissionCount < form.submitLimit
  }

  public async getSubmittability(
    formIdOrEntity: string | Form,
    sourceHash: string
  ): Promise<FormSubmittability> {
    const result: FormSubmittability = {
      submittable: true,
      tags: [],
    }

    const form =
      typeof formIdOrEntity === 'string'
        ? await this.forms.findOneBy({ id: formIdOrEntity })
        : formIdOrEntity

    if (!form) {
      result.submittable = false
      result.tags.push(FormSubmittabilityTag.FormDoesNotExist)
      return result
    }

    if (form.submitLimit !== 0) {
      const submissionCount = await this.submissions.countByFormId(form.id)

      if (submissionCount >= form.submitLimit) {
        result.submittable = false
        result.tags.push(FormSubmittabilityTag.SubmitLimitReached)
      }
    }

    const existingSubmission = await this.submissions.existsBy({
      form: { id: form.id },
      sourceHash,
    })

    if (existingSubmission) {
      result.submittable = false
      result.tags.push(FormSubmittabilityTag.AlreadySubmitted)
    }

    return result
  }

  public async submit(id: string, sourceHash: string, data: FormSubmissionData) {
    const count = await this.submissions.countByFormId(id)
    const form = await this.forms.findOneByOrFail({ id })

    // Update submission if exists by sourcehash, otherwise create a new one
    const existingSubmission = await this.submissions.findOneBy({
      form: { id },
      sourceHash,
    })

    if (existingSubmission) {
      await this.manager.transaction(async (manager) => {
        await manager.update(FormSubmission, { id: existingSubmission.id }, { data })
      })

      return
    }

    // Check if the form has reached its submission limit
    // If the limit is 0, it means there is no limit
    if (form.submitLimit !== 0 && count >= form.submitLimit) {
      throw new FormSubmissionLimitExceededError(null, 'This form has reached its submission limit')
    }

    const submission = this.submissions.create({
      form: {
        id,
      },
      data,
      sourceHash,
    })

    await this.manager.transaction(async (manager) => {
      await manager.save(submission)
    })
  }

  public async createNew(templateId: string) {
    const template = await this.templates.findOneByOrFail({ id: templateId })

    const form = this.forms.create({
      submitLimit: template.defaultSubmitLimit,
      template: {
        id: templateId,
      },
    })

    await this.manager.transaction(async (manager) => {
      await manager.save(form)
    })

    return form
  }

  public async update(id: string, data: Omit<DeepPartial<Form>, 'id'>) {
    if (!(await this.forms.existsBy({ id }))) {
      throw new EntityNotFoundError(null, `Form with ID "${id}" doesn't exist`)
    }

    await this.manager.transaction(async (manager) => {
      await manager.update(Form, { id }, data)
    })

    return this.forms.findOneBy({ id })
  }

  public async renderDescription(form: Form, langs: SupportedLanguages[], target: RenderTarget) {
    const template = await form.template
    const replaced = langs.map((lang) => {
      const description = template.description[SupportedLanguages[lang]]

      substituteTemplateVariables(
        description,
        {
          location: form.location[SupportedLanguages[lang]],
          startsAt: form.startsAt,
          luxonLang: SupportedLanguages[lang].replace(/_/g, '-'),
        },
        target
      )

      return description
    })

    const joiner =
      langs.length > 1
        ? (index) => {
          return [{ type: 'hardBreak' }, { type: 'text', text: flagMap[langs[index]] }]
        }
        : undefined

    const joined = Utils.join(replaced, joiner)

    return renderJsonContent(joined, target)
  }
}
