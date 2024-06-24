import { inputObjectType, mutationField } from 'nexus'

import { announcerController } from '../../../server/static-context'

const UpdateAnnouncerWhereInput = inputObjectType({
  name: 'UpdateAnnouncerWhereInput',
  definition(t) {
    t.id('id')
  },
})

const UpdateAnnouncerDataInput = inputObjectType({
  name: 'UpdateAnnouncerDataInput',
  definition(t) {
    t.string('name')
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
      const result = await announcerController.update(args.where.id, args.data)

      return result
    },
  })
})
