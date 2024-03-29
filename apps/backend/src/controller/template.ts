import { AppDataSource } from '../data-source'
import { TemplateRepository } from '../repository/template'
import { Template } from '../entity/template'
import { DeepPartial } from 'typeorm'
import { EntityNotFoundError } from '../errors/entity-not-found'
import { EntityFetchingError } from '../errors/entity-fetching-error'
import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'

export class TemplateController {
  private manager = AppDataSource.createEntityManager()

  private templates = this.manager.withRepository(TemplateRepository)

  public async count() {
    return await this.templates.count()
  }

  public async listAll() {
    return await this.templates.find()
  }

  public async getById(id: string) {
    return await this.templates.findOneBy({ id })
  }

  public async paginate(args: PaginationArgs) {
    return await this.templates.paginate(args)
  }

  public async createNew() {
    const template = this.templates.create({
      fields: [],
    })

    await this.manager.transaction(async (manager) => {
      await manager.save(template)
    })

    return template
  }

  public async update(id: string, data: Omit<DeepPartial<Template>, 'id'>) {
    try {
      if (!(await this.templates.existsBy({ id }))) {
        throw new EntityNotFoundError(`Template with ID "${id}" doesn't exist`)
      }

      await this.manager.transaction(async (manager) => {
        await manager.update(Template, { id }, data)
      })

      return this.templates.findOneBy({ id })
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
