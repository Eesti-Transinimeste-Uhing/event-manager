import { AppDataSource } from '../data-source'
import { PaginateAndSortArgs, paginate } from '../lib/pagination'
import { FormSubmission } from '../entity/form-submission'

export const FormSubmissionRepository = AppDataSource.getRepository(FormSubmission).extend({
  paginate(args: PaginateAndSortArgs) {
    const qb = this.createQueryBuilder('form_submission')

    return paginate(args, qb)
  },

  countByFormId(formId: string) {
    return this.count({ where: { form: { id: formId } } })
  },
})
