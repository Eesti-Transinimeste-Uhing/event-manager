import path from 'node:path'
import { objectType } from 'nexus'

export const Form = objectType({
  name: 'Form',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/form.ts'),
    export: 'Form',
  },
  definition(t) {
    t.id('id')
    t.nullable.string('name')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.url('banner', {
      resolve(root) {
        return root.bannerUrl
      },
    })
    t.jsonObject('description', {
      async resolve(root) {
        return (await root.template).description
      },
    })
    t.field('template', {
      type: 'Template',
    })
  },
})
