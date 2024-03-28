import { objectType } from 'nexus'
import path from 'node:path'

import urlJoin from '../../lib/url-join'
import { config } from '../../config'

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
    t.string('description')
    t.url('banner', {
      async resolve(root) {
        return urlJoin(config.server.publicUrl, 'v1', 'static', 'template-banner', root.id)
      },
    })
    t.list.field('fields', {
      type: 'FormFieldKind',
    })
  },
})
