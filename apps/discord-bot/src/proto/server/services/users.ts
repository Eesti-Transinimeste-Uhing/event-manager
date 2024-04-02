import { UnimplementedUsersService, UserFilter, UserRole, UserRolesResult } from '@etu/events-proto'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { Client } from '../../../discord/client'
import { config } from '../../../config'

export class UsersService extends UnimplementedUsersService {
  constructor(private client: Client) {
    super()
  }

  override async getUserRoles(
    call: ServerUnaryCall<UserFilter, UserRolesResult>,
    callback: sendUnaryData<UserRolesResult>
  ) {
    try {
      let member = this.client.guild.members.cache.find((m) => m.user.id === call.request.id)

      if (!member) {
        member = await this.client.guild.members.fetch({ user: call.request.id })
      }

      if (!member) {
        return callback(
          null,
          new UserRolesResult({
            roles: [],
          })
        )
      }

      const roles: UserRole[] = []

      if (config.discord.user.owners.includes(member.user.id)) {
        roles.push(UserRole.Owner)
      }

      for (const role of member.roles.cache.keys()) {
        if (role === config.discord.role.admin) {
          roles.push(UserRole.Admin)
          continue
        }

        if (role === config.discord.role.editor) {
          roles.push(UserRole.Editor)
          continue
        }

        if (role === config.discord.role.publisher) {
          roles.push(UserRole.Publisher)
          continue
        }
      }

      callback(null, new UserRolesResult({ roles }))
    } catch (error) {
      if (error instanceof Error) {
        callback(error)
      }
    }
  }
}
