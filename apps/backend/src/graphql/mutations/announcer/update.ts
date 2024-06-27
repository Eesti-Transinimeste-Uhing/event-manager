import { inputObjectType, mutationField } from 'nexus'

import { announcerController } from '../../../server/static-context'

const UpdateAnnouncerWhereInput = inputObjectType({
  name: 'UpdateAnnouncerWhereInput',
  definition(t) {
    t.id('id')
  },
})

export const AnnouncerOptionsDiscordInput = inputObjectType({
  name: 'AnnouncerOptionsDiscordInput',
  definition(t) {
    t.string('channelId')
    t.string('guildId')
  },
})

export const AnnouncerOptionsInput = inputObjectType({
  name: 'AnnouncerOptionsInput',
  definition(t) {
    t.field('discord', {
      type: 'AnnouncerOptionsDiscordInput',
    })
  },
})

const UpdateAnnouncerDataInput = inputObjectType({
  name: 'UpdateAnnouncerDataInput',
  definition(t) {
    t.string('name')
    t.field('options', {
      type: 'AnnouncerOptionsInput',
    })
  },
})

export const UpdateAnnouncer = mutationField((t) => {
  t.nullable.field('updateAnnouncer', {
    type: 'Announcer',
    args: {
      where: UpdateAnnouncerWhereInput.asArg(),
      data: UpdateAnnouncerDataInput.asArg(),
    },
    async resolve(root, args, context) {
      return await announcerController.update(args.where.id, args.data)
    },
  })
})
