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
    t.i18nString('name_i18n', {
      resolve(root) {
        return root.name
      },
    })
    t.string('name', {
      args: {
        where: 'WhereLangInput',
      },
      resolve(root, args) {
        return root.name[args.where.language]
      },
    })
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.i18nJSON('description_i18n', {
      resolve(root) {
        return root.description
      },
    })
    t.nullable.jsonObject('description', {
      args: {
        where: 'WhereLangInput',
      },
      resolve(root, args) {
        return root.description[args.where.language]
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
