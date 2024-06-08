import { BaseContext } from '@apollo/server'
import { ApolloFastifyContextFunction } from '@as-integrations/fastify'
import { UserFilter, UserRole } from '@etu/events-proto/dist/discord-bot/users'
import { FastifyRequest } from 'fastify'

import { User } from '../entity/user'
import { UserRepository } from '../repository/user'
import { usersClient } from '../proto/clients/discord-bot'
import { hash } from '../lib/hash'

export type GraphqlContext = BaseContext & {
  user: User | null
  roles: UserRole[]
  request: FastifyRequest
  sourceHash: string
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

  const sourceHash = hash(user ? user.id : request.ip)

  return {
    user,
    roles,
    request,
    sourceHash,
  }
}
