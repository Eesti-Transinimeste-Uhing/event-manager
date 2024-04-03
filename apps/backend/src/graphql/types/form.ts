import { objectType } from 'nexus'
import path from 'node:path'

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
    t.field('template', {
      type: 'Template',
    })
  },
})
