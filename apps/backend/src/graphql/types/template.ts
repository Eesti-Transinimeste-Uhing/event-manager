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
    t.string('name')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.nullable.jsonObject('description')
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
