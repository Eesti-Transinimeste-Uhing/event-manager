import { makeSchema, queryField, queryType } from 'nexus'

import { DiscordCallbackMutation } from './mutations/discord-callback'
import { User } from './types/user'

export const schema = makeSchema({
  types: [DiscordCallbackMutation, User],
})
