import { rule } from 'graphql-shield'
import { GraphqlContext } from '../context'

export const isPublisher = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphqlContext,
  info
) => {
  return '"isPublisher" is not implemented yet!'
})
