import { rule } from 'graphql-shield'
import { DynamicContext } from '../../server/dynamic-context'
import { UserRole } from '@etu/events-proto/generated/discord-bot/users'

export const isEditor = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: DynamicContext,
  info
) => {
  return ctx.roles.includes(UserRole.Editor)
})
