import { rule } from 'graphql-shield'
import { GraphqlContext } from '../context'

export const isEditor = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphqlContext,
  info
) => {
  return ctx.roles.editor
})
