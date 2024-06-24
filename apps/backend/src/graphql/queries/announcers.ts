import { queryField } from 'nexus'
import { announcerController } from '../../server/static-context'

export const AnnouncersQuery = queryField((t) => {
  t.connectionField('announcers', {
    type: 'Announcer',
    resolve(root, args) {
      return announcerController.paginate(args)
    },
  })
})
