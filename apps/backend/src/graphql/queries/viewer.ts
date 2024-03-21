import { queryField } from 'nexus'
import { userController } from '../../server/static-context'

export const ViewerQuery = queryField((t) => {
  t.nullable.field('viewer', {
    type: 'User',
    async resolve(root, args, context) {
      if (context.user) {
        await userController.refreshDiscordAccessToken(context.user)
      }

      return context.user
    },
  })
})
