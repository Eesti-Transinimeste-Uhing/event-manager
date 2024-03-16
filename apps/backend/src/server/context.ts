import { BaseContext } from '@apollo/server'
import { ApolloFastifyContextFunction } from '@as-integrations/fastify'
import { User } from '../entity/user'
import { UserRepository } from '../repository/user'

export type GraphqlContext = BaseContext & {
  user: User | null
}

export const graphqlContextFunction: ApolloFastifyContextFunction<GraphqlContext> = async (
  request,
  reply
) => {
  const sessionData = request.session.data()
  const user =
    sessionData && 'passport' in sessionData && typeof sessionData.passport === 'string'
      ? await UserRepository.findOneBy({ id: sessionData.passport })
      : null

  return {
    user,
  }
}
