import { objectType } from 'nexus'
import path from 'node:path'

export const Template = objectType({
  name: 'Template',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/template.ts'),
    export: 'Template',
  },
  definition(t) {
    t.id('id')
    t.string('name', {
      args: {
        where: 'WhereLangInput',
      },
      resolve(root, args) {
        return root.name[args.where.lang]
      },
    })
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.jsonObject('description', {
      args: {
        where: 'WhereLangInput',
      },
      resolve(root, args) {
        return root.description[args.where.lang]
      },
    })
    t.int('bannerOffset')
    t.url('banner', {
      resolve(root) {
        return root.bannerUrl
      },
    })
    t.list.field('fields', {
      type: 'FormFieldKind',
    })
  },
})
