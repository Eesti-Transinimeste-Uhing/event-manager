import { inputObjectType, mutationField } from 'nexus'
import { formController } from '../../../server/static-context'

export const CreateFormInput = inputObjectType({
  name: 'CreateFormInput',
  definition(t) {
    t.id('templateId')
  },
})

export const CreateForm = mutationField((t) => {
  t.field('createForm', {
    type: 'Form',
    args: {
      input: CreateFormInput.asArg(),
    },
    async resolve(root, args, context) {
      return await formController.createNew(args.input.templateId)
    },
  })
})
