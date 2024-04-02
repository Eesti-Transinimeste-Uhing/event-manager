import { DeepPartial } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Form } from '../entity/form'
import { FormRepository } from '../repository/form'
import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'
import { EntityNotFoundError } from '../errors/entity-not-found'
import { EntityFetchingError } from '../errors/entity-fetching-error'

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

  public async softRemove(id: string) {
    await this.manager.transaction(async (manager) => {
      await manager.softRemove(Form, { id })
    })

    return true
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
    try {
      if (!(await this.forms.existsBy({ id }))) {
        throw new EntityNotFoundError(`Template with ID "${id}" doesn't exist`)
      }

      await this.manager.transaction(async (manager) => {
        await manager.update(Form, { id }, data)
      })

      return this.forms.findOneBy({ id })
    } catch (error) {
      if (error instanceof Error) {
        throw new EntityFetchingError(error, 'Fetching template for update')
      } else {
        throw new EntityFetchingError(
          `Thrown while fetching template for update: "${String(error)}"`
        )
      }
    }
  }
}
