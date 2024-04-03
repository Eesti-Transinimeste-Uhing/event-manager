import { enumType, objectType } from 'nexus'
import path from 'node:path'
import { UserRole } from '@etu/events-proto'

import { fetchDiscordMe } from '../../lib/discord-me'

export const UserRoleEnum = enumType({
  name: 'UserRole',
  members: UserRole,
})

export const User = objectType({
  name: 'User',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/user.ts'),
    export: 'User',
  },
  definition(t) {
    t.id('id')
    t.field('discord', {
      type: 'DiscordUser',
      resolve(root) {
        return fetchDiscordMe(root.accessToken)
      },
    })
    t.list.field('roles', {
      type: 'UserRole',
      resolve(root, args, context) {
        if (root.id === context.user?.id) {
          return context.roles
        }

        return []
      },
    })
  },
})
