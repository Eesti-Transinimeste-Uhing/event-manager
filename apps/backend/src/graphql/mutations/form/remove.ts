import { inputObjectType, mutationField } from 'nexus'
import { formController } from '../../../server/static-context'

export const RemoveFormInput = inputObjectType({
  name: 'RemoveFormInput',
  definition(t) {
    t.id('id')
  },
})

export const RemoveForm = mutationField((t) => {
  t.boolean('removeForm', {
    args: {
      input: RemoveFormInput.asArg(),
    },
    async resolve(root, args, context) {
      return await formController.softRemove(args.input.id)
    },
  })
})
