import { queryField } from 'nexus'
import { formController } from '../../server/static-context'
import { WhereIdInput } from '../types/where-id-input'

export const FormQuery = queryField((t) => {
  t.nullable.field('form', {
    type: 'Form',
    args: {
      where: WhereIdInput.asArg(),
    },
    resolve(root, args, context) {
      return formController.getById(args.where.id)
    },
  })
})
