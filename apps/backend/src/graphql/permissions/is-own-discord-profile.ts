import { rule } from 'graphql-shield'
import { DynamicContext } from '../../server/dynamic-context'

export const isOwnDiscordProfile = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: DynamicContext,
  info
) => {
  return !!ctx.user?.discordId && ctx.user?.discordId === parent.id
})
