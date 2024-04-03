import { inputObjectType, mutationField } from 'nexus'

import { formController } from '../../../server/static-context'
import { hash } from '../../../lib/hash'

const SubmitFormWhereInput = inputObjectType({
  name: 'SubmitFormWhereInput',
  definition(t) {
    t.id('id')
  },
})

const SubmitFormDataInput = inputObjectType({
  name: 'SubmitFormDataInput',
  definition(t) {
    t.string('name')
    t.nullable.string('value')
  },
})

export const SubmitForm = mutationField((t) => {
  t.boolean('submitForm', {
    args: {
      where: SubmitFormWhereInput.asArg(),
      data: SubmitFormDataInput.asArg({ list: true }),
    },
    async resolve(root, args, context) {
      await formController.submit(
        args.where.id,
        hash(context.user ? context.user.id : context.request.ip),
        args.data
      )

      return true
    },
  })
})
