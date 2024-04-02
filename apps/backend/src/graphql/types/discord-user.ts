import { objectType } from 'nexus'
import path from 'node:path'

export const DiscordUser = objectType({
  name: 'DiscordUser',
  sourceType: {
    export: 'DiscordOauthInfo',
    module: path.resolve(__dirname, '../../lib/discord-me.ts'),
  },
  definition(t) {
    t.id('id')
    t.string('username')
    t.string('global_name')
    t.string('banner_color')
    t.string('locale')
    t.url('avatar', {
      resolve(root) {
        return `https://cdn.discordapp.com/avatars/${root.id}/${root.avatar}`
      },
    })
  },
})
