import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'
import { AppDataSource } from '../data-source'
import { paginate } from '../lib/pagination'
import { FormSubmission } from '../entity/form-submission'

export const FormSubmissionRepository = AppDataSource.getRepository(FormSubmission).extend({
  paginate(args: PaginationArgs) {
    const qb = this.createQueryBuilder('form_submission')

    return paginate(args, qb)
  },
})
