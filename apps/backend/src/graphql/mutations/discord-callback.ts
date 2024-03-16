import { mutationField } from 'nexus'

export const DiscordCallbackMutation = mutationField((t) => {
  t.field('discordCallback', {
    type: 'String',
    resolve() {
      return 'HI'
    },
  })
})
