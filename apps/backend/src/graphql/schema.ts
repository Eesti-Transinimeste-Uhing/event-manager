import { makeSchema, queryField, queryType } from 'nexus'

import { DiscordCallbackMutation } from './mutations/discord-callback'
import { User } from './types/user'
import { CheckDiscordTokenQuery } from './queries/checkDiscordToken'

export const schema = makeSchema({
  types: [DiscordCallbackMutation, CheckDiscordTokenQuery, User],
})
