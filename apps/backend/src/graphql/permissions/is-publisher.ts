import { rule } from 'graphql-shield'
import { GraphqlContext } from '../../server/dynamic-context'
import { UserRole } from '@etu/events-proto/dist/discord-bot/users'

export const isPublisher = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphqlContext,
  info
) => {
  return ctx.roles.includes(UserRole.Publisher)
})
