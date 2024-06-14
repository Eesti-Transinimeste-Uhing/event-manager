import { inputObjectType, mutationField } from 'nexus'

import { announcerController } from '../../../server/static-context'

const AnnounceFormWhereInput = inputObjectType({
  name: 'AnnounceFormWhereInput',
  definition(t) {
    t.id('id')
  },
})

export const AnnounceForm = mutationField((t) => {
  t.boolean('announceForm', {
    args: {
      where: AnnounceFormWhereInput.asArg(),
    },
    async resolve(root, args, context) {
      await announcerController.announce(args.where.id)

      return true
    },
  })
})
