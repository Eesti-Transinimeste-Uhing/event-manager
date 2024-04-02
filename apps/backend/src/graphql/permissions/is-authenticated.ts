import { rule } from 'graphql-shield'
import { GraphqlContext } from '../context'

export const isAuthenticated = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphqlContext,
  info
) => {
  return ctx.user !== null
})
