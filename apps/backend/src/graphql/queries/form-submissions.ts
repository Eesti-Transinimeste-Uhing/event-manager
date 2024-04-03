import { queryField } from 'nexus'
import { formController } from '../../server/static-context'

export const FormSubmissionsQuery = queryField((t) => {
  t.connectionField('formSubmissions', {
    type: 'FormSubmission',
    async resolve(root, args) {
      return formController.paginateSubmissions(args)
    },
  })
})
