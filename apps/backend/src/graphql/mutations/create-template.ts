import { inputObjectType, mutationField } from 'nexus'
import { templateController } from '../../server/static-context'

const CreateTemplateInput = inputObjectType({
  name: 'CreateTemplateInput',
  definition(t) {
    t.list.field('fields', {
      type: 'FormFieldKind',
    })
  },
})

export const CreateTemplate = mutationField((t) => {
  t.field('createTemplate', {
    type: 'Template',
    args: {
      input: CreateTemplateInput.asArg(),
    },
    resolve(root, args, context) {
      return templateController.createNew(args.input)
    },
  })
})
