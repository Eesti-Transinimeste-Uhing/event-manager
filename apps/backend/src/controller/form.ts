import { DeepPartial } from 'typeorm'
import { renderJsonContent } from '@etu/tiptap'

import { AppDataSource } from '../data-source'
import { Form } from '../entity/form'
import { FormRepository } from '../repository/form'
import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'
import { EntityNotFoundError } from '../lib/errors'
import { FormSubmissionData } from '../entity/form-submission'
import { FormSubmissionRepository } from '../repository/form-submission'
import { formBanners, templateBanners } from '../storage'
import { SupportedLanguages } from '../lib/i18n'
import { RenderTarget } from '@etu/tiptap/src/render'
import { DateTime } from 'luxon'

export class FormController {
  private manager = AppDataSource.createEntityManager()

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

  public async paginate(args: PaginationArgs) {
    return await this.forms.paginate(args)
  }

  public async getBanner(id: string) {
    return await formBanners.get(id)
  }

  public async paginateSubmissions(args: PaginationArgs) {
    return await this.submissions.paginate(args)
  }

  public async softRemove(id: string) {
    await this.manager.transaction(async (manager) => {
      await manager.softRemove(Form, { id })
    })

    return true
  }

  public async submit(id: string, sourceHash: string, data: FormSubmissionData) {
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
    const form = this.forms.create({
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

    return renderJsonContent(template.description[lang], target, {
      location: form.location[lang],
      startsAt: form.startsAt,
      luxonLang: lang.replaceAll('_', '-'),
    })
  }
}
