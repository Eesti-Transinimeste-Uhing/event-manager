import { AppDataSource } from '../data-source'
import { FormRepository } from '../repository/form'
import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'

export class FormController {
  private manager = AppDataSource.createEntityManager()

  private forms = this.manager.withRepository(FormRepository)

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
}
