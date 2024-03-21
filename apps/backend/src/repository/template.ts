import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'
import { AppDataSource } from '../data-source'
import { Template } from '../entity/template'
import { paginate } from '../lib/pagination'

export const TemplateRepository = AppDataSource.getRepository(Template).extend({
  paginate(args: PaginationArgs) {
    const qb = this.createQueryBuilder('template')

    return paginate(args, qb)
  },
})
