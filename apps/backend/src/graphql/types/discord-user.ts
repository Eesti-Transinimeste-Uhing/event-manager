import { objectType } from 'nexus'

export const DiscordUser = objectType({
  name: 'DiscordUser',
  definition(t) {
    t.id('id')
  },
})
