import { objectType } from 'nexus'
import path from 'node:path'
import { discordAvatars } from '../../storage'
import urlJoin from '../../lib/url-join'
import { config } from '../../config'

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
      async resolve(root) {
        if (!(await discordAvatars.exists(root.id))) {
          await discordAvatars.get(root.id, root.avatar)
        }

        return urlJoin(config.server.publicUrl, 'v1', 'static', 'discord-avatar', root.id)
      },
    })
  },
})
