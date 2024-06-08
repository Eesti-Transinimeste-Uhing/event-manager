import { AppDataSource } from '../data-source'
import { TemplateRepository } from '../repository/template'
import { Template } from '../entity/template'
import { DeepPartial } from 'typeorm'
import { templateBanners } from '../storage'
import { EntityFetchingError, EntityNotFoundError } from '../lib/errors'
import { PaginateAndSortArgs } from '../lib/pagination'

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

  public async paginate(args: PaginateAndSortArgs) {
    return await this.templates.paginate(args)
  }

  public async softRemove(id: string) {
    await this.manager.transaction(async (manager) => {
      await manager.softRemove(Template, { id })
    })

    return true
  }

  public async createNew() {
    const template = this.templates.create({
      fields: [],
    })

    await this.manager.transaction(async (manager) => {
      await manager.save(template)
    })

    // This will miss the cache and generate a default banner
    await templateBanners.get(template.id)

    return template
  }

  public async update(id: string, data: Omit<DeepPartial<Template>, 'id'>) {
    try {
      if (!(await this.templates.existsBy({ id }))) {
        throw new EntityNotFoundError(null, `Template with ID "${id}" doesn't exist`)
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
          null,
          `Thrown while fetching template for update: "${String(error)}"`
        )
      }
    }
  }
}
