import { SupportedLanguages } from '@etu/events-proto/dist/lib'
import { objectType } from 'nexus'
import path from 'node:path'

export const Announcer = objectType({
  name: 'Announcer',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/announcer.ts'),
    export: 'Announcer',
  },
  definition(t) {
    t.id('id')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')

    t.string('name')
  },
})
