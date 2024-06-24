import { mutationField } from 'nexus'
import { announcerController } from '../../../server/static-context'

export const CreateAnnouncer = mutationField((t) => {
  t.field('createAnnouncer', {
    type: 'Announcer',
    async resolve(root, args, context) {
      return await announcerController.createNew()
    },
  })
})
