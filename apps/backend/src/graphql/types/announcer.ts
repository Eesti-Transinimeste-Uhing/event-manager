import { enumType, objectType, unionType } from 'nexus'
import path from 'node:path'

import { AnnouncerType } from '../../entity/announcer'

export const AnnouncerTypeEnum = enumType({
  name: 'AnnouncerType',
  members: AnnouncerType,
})

export const AnnouncerOptionsDiscord = objectType({
  name: 'AnnouncerOptionsDiscord',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/announcer-options-discord.ts'),
    export: 'AnnouncerOptionsDiscord',
  },
  definition(t) {
    t.string('channelId')
    t.string('guildId')
  },
})

export const AnnouncerOptions = unionType({
  name: 'AnnouncerOptions',
  definition(t) {
    t.members('AnnouncerOptionsDiscord')
  },
  resolveType(value) {
    if ('channelId' in value) {
      return 'AnnouncerOptionsDiscord'
    }

    return null
  },
})

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
    t.field('type', {
      type: AnnouncerTypeEnum,
    })
    t.nullable.field('options', {
      type: 'AnnouncerOptions',
      resolve(root) {
        return root.options?.discord
      },
    })
  },
})
