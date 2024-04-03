import { BaseContext } from '@apollo/server'
import { ApolloFastifyContextFunction } from '@as-integrations/fastify'

import { User } from '../entity/user'
import { UserRepository } from '../repository/user'
import { usersClient } from '../proto/clients/discord-bot'
import { UserFilter, UserRole } from '@etu/events-proto'
import { FastifyRequest } from 'fastify'

export type GraphqlContext = BaseContext & {
  user: User | null
  roles: UserRole[]
  request: FastifyRequest
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

  const roles = user
    ? (await usersClient.getUserRoles(new UserFilter({ id: user.discordId }))).roles
    : []

  return {
    user,
    roles,
    request,
  }
}
