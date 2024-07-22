import { inputObjectType, mutationField } from 'nexus'

import { announcerController } from '../../../server/static-context'

const AnnounceFormWhereInput = inputObjectType({
  name: 'AnnounceFormWhereInput',
  definition(t) {
    t.id('id')
  },
})

export const AnnounceForm = mutationField((t) => {
  t.field('announceForm', {
    type: 'BullJob',
    args: {
      where: AnnounceFormWhereInput.asArg(),
    },
    async resolve(root, args, context) {
      return await announcerController.announce(args.where.id)
    },
  })
})
