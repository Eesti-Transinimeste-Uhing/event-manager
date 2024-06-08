import { inputObjectType, mutationField } from 'nexus'
import { formController } from '../../../server/static-context'

const UpdateFormWhereInput = inputObjectType({
  name: 'UpdateFormWhereInput',
  definition(t) {
    t.id('id')
  },
})

const UpdateFormDataInput = inputObjectType({
  name: 'UpdateFormDataInput',
  definition(t) {
    t.field('name', {
      type: 'I18nStringInput',
    })
    t.dateTime('startsAt')
    t.field('location', {
      type: 'I18nStringInput',
    })
    t.int('submitLimit')
  },
})

export const UpdateForm = mutationField((t) => {
  t.nullable.field('updateForm', {
    type: 'Form',
    args: {
      where: UpdateFormWhereInput.asArg(),
      data: UpdateFormDataInput.asArg(),
    },
    async resolve(root, args, context) {
      return await formController.update(args.where.id, args.data)
    },
  })
})
