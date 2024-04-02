import { objectType } from 'nexus'
import path from 'node:path'
import { fetchDiscordMe } from '../../lib/discord-me'

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
  },
})
