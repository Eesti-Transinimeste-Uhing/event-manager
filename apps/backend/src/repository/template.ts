import { AppDataSource } from '../data-source'
import { Template } from '../entity/template'
import { PaginateAndSortArgs, paginate } from '../lib/pagination'

export const TemplateRepository = AppDataSource.getRepository(Template).extend({
  paginate(args: PaginateAndSortArgs) {
    const qb = this.createQueryBuilder('template')

    return paginate(args, qb)
  },
})
