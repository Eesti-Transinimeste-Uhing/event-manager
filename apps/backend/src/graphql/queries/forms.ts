import { queryField } from 'nexus'
import { formController } from '../../server/static-context'

export const FormsQuery = queryField((t) => {
  t.connectionField('forms', {
    type: 'Form',
    resolve(root, args) {
      return formController.paginate(args)
    },
  })
})
