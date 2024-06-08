import { AppDataSource } from '../data-source'
import { PaginateAndSortArgs, paginate } from '../lib/pagination'
import { Announcer } from '../entity/announcer'

export const AnnouncerRepository = AppDataSource.getRepository(Announcer).extend({
  paginate(args: PaginateAndSortArgs) {
    const qb = this.createQueryBuilder('announcer')

    return paginate(args, qb)
  },
})
