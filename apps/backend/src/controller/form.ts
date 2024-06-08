import { DeepPartial } from 'typeorm'
import { renderJsonContent } from '@etu/tiptap'
import { SupportedLanguages } from '@etu/events-proto/dist/lib'

import { AppDataSource } from '../data-source'
import { Form } from '../entity/form'
import { FormRepository } from '../repository/form'
import { EntityNotFoundError, FormSubmissionLimitExceededError } from '../lib/errors'
import { FormSubmissionData } from '../entity/form-submission'
import { FormSubmissionRepository } from '../repository/form-submission'
import { formBanners } from '../storage'
import { RenderTarget } from '@etu/tiptap/src/render'
import { PaginateAndSortArgs } from '../lib/pagination'
import { TemplateRepository } from '../repository/template'

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

  // TODO: Make use of this in the frontend and allow updating existing submissions
  public async getExistingSubmission(id: string, sourceHash: string) {
    return await this.submissions.findOneBy({ form: { id }, sourceHash })
  }

  public async submit(id: string, sourceHash: string, data: FormSubmissionData) {
    const count = await this.submissions.countByFormId(id)
    const form = await this.forms.findOneByOrFail({ id })

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

  public async renderDescription(form: Form, lang: SupportedLanguages, target: RenderTarget) {
    const template = await form.template

    return renderJsonContent(template.description[SupportedLanguages[lang]], target, {
      location: form.location[lang],
      startsAt: form.startsAt,
      luxonLang: SupportedLanguages[lang].replaceAll('_', '-'),
    })
  }
}
