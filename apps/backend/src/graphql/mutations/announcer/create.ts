import { inputObjectType, mutationField } from 'nexus'
import { announcerController } from '../../../server/static-context'

export const CreateAnnouncerData = inputObjectType({
  name: 'CreateAnnouncerData',
  definition(t) {
    t.field('type', {
      type: 'AnnouncerType',
    })
  },
})

export const CreateAnnouncer = mutationField((t) => {
  t.field('createAnnouncer', {
    type: 'Announcer',
    args: {
      data: 'CreateAnnouncerData',
    },
    async resolve(root, args, context) {
      return await announcerController.createNew(args.data.type)
    },
  })
})
