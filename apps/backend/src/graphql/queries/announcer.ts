import { queryField } from 'nexus'
import { announcerController } from '../../server/static-context'
import { WhereIdInput } from '../types/where-id-input'

export const AnnouncerQuery = queryField((t) => {
  t.nullable.field('announcer', {
    type: 'Announcer',
    args: {
      where: WhereIdInput.asArg(),
    },
    resolve(root, args, context) {
      return announcerController.getById(args.where.id)
    },
  })
})
