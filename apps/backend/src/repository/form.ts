import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'
import { AppDataSource } from '../data-source'
import { Form } from '../entity/form'
import { paginate } from '../lib/pagination'

export const FormRepository = AppDataSource.getRepository(Form).extend({
  paginate(args: PaginationArgs) {
    const qb = this.createQueryBuilder('form')

    return paginate(args, qb)
  },
})
