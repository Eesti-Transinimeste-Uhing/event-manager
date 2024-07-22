import { rule } from 'graphql-shield'
import { GraphqlContext } from '../../server/dynamic-context'

export const isOwnDiscordProfile = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphqlContext,
  info
) => {
  return !!ctx.user?.discordId && ctx.user?.discordId === parent.id
})
