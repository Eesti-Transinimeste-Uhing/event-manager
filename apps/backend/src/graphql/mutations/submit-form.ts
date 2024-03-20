import { inputObjectType, mutationField, unionType } from 'nexus'

const SubmitFormInput = inputObjectType({
  name: 'SubmitFormInput',
  definition(t) {
    t.id('id')

    // TODO: Field values!
  },
})

export const SubmitFormMutation = mutationField((t) => {
  t.boolean('submitForm', {
    args: {
      input: SubmitFormInput.asArg(),
    },
  })
})
