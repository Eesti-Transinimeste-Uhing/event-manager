import { rule } from 'graphql-shield'
import { GraphqlContext } from '../context'
import { UserRole } from '@etu/events-proto/dist/discord-bot/users'

export const isOwner = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphqlContext,
  info
) => {
  return ctx.roles.includes(UserRole.Owner)
})
