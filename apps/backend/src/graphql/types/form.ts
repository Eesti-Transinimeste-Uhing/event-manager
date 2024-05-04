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
    t.nullable.string('name', {
      args: {
        where: 'WhereLangInput',
      },
      resolve(root, args) {
        return root.name[args.where.lang]
      },
    })
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.url('banner', {
      resolve(root) {
        return root.bannerUrl
      },
    })
    t.jsonObject('description', {
      args: {
        where: 'WhereLangInput',
      },
      async resolve(root, args) {
        const template = await root.template

        return template.description[args.where.lang]
      },
    })
    t.field('template', {
      type: 'Template',
    })
  },
})
