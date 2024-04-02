import { BaseContext } from '@apollo/server'
import { ApolloFastifyContextFunction } from '@as-integrations/fastify'

import { User } from '../entity/user'
import { UserRepository } from '../repository/user'
import { usersClient } from '../proto/clients/discord-bot'
import { UserFilter, UserRole } from '@etu/events-proto'

export type GraphqlContext = BaseContext & {
  user: User | null
  roles: {
    owner: boolean
    admin: boolean
    editor: boolean
    publisher: boolean
  }
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

  const owner = roles.includes(UserRole.Owner)
  const admin = roles.includes(UserRole.Admin)
  const editor = roles.includes(UserRole.Editor)
  const publisher = roles.includes(UserRole.Publisher)

  return {
    user,
    roles: {
      owner,
      admin,
      editor,
      publisher,
    },
  }
}
