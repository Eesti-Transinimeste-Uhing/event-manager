import { AppDataSource } from '../data-source'
import { Form } from '../entity/form'
import { PaginateAndSortArgs, paginate } from '../lib/pagination'

export const FormRepository = AppDataSource.getRepository(Form).extend({
  paginate(args: PaginateAndSortArgs) {
    const qb = this.createQueryBuilder('form')

    return paginate(args, qb)
  },
})
