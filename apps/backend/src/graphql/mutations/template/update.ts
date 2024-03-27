import { inputObjectType, mutationField } from 'nexus'
import { templateController } from '../../../server/static-context'

const UpdateTemplateWhereInput = inputObjectType({
  name: 'UpdateTemplateWhereInput',
  definition(t) {
    t.id('id')
  },
})

const UpdateTemplateDataInput = inputObjectType({
  name: 'UpdateTemplateDataInput',
  definition(t) {
    t.string('name')
    t.string('description')
    t.list.field('fields', {
      type: 'FormFieldKind',
    })
  },
})

export const UpdateTemplate = mutationField((t) => {
  t.nullable.field('updateTemplate', {
    type: 'Template',
    args: {
      where: UpdateTemplateWhereInput.asArg(),
      data: UpdateTemplateDataInput.asArg(),
    },
    resolve(root, args, context) {
      return templateController.update(args.where.id, args.data)
    },
  })
})
