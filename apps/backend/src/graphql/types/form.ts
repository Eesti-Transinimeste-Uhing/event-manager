import path from 'node:path'
import { objectType } from 'nexus'
import { DateTime } from 'luxon'

import urlJoin from '../../lib/url-join'
import { config } from '../../config'

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
    t.string('description', {
      async resolve(root) {
        return (await root.template).description
      },
    })
    t.url('banner', {
      async resolve(root) {
        return urlJoin(
          config.server.publicUrl,
          'v1',
          'static',
          'template-banner',
          (await root.template).id,
          DateTime.fromJSDate(root.updatedAt).toUnixInteger().toString()
        )
      },
    })
    t.field('template', {
      type: 'Template',
    })
  },
})
