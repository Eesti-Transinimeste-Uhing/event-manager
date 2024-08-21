import { rule } from 'graphql-shield'
import { DynamicContext } from '../../server/dynamic-context'

export const isAuthenticated = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: DynamicContext,
  info
) => {
  return ctx.user !== null
})
