import { inputObjectType, mutationField } from 'nexus'
import { templateController } from '../../../server/static-context'

export const RemoveTemplateInput = inputObjectType({
  name: 'RemoveTemplateInput',
  definition(t) {
    t.id('id')
  },
})

export const RemoveTemplate = mutationField((t) => {
  t.boolean('removeTemplate', {
    args: {
      input: RemoveTemplateInput.asArg(),
    },
    async resolve(root, args, context) {
      return await templateController.softRemove(args.input.id)
    },
  })
})
