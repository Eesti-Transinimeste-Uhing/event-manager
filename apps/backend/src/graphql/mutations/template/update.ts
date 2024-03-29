import { inputObjectType, mutationField } from 'nexus'
import { templateController } from '../../../server/static-context'
import { templateBanners } from '../../../storage'

const UpdateTemplateWhereInput = inputObjectType({
  name: 'UpdateTemplateWhereInput',
  definition(t) {
    t.id('id')
  },
})

const UpdateTemplateDataInput = inputObjectType({
  name: 'UpdateTemplateDataInput',
  definition(t) {
    t.nullable.upload('banner')
    t.int('bannerOffset')
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
    async resolve(root, args, context) {
      const { banner, ...data } = args.data
      const result = await templateController.update(args.where.id, data)

      if (banner) {
        const { createReadStream } = await banner
        await templateBanners.put(args.where.id, createReadStream())
      }

      return result
    },
  })
})
