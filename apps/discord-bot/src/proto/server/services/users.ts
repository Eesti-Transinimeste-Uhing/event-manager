import {
  UnimplementedUsersService,
  UserFilter,
  UserRole,
  UserRolesResult,
} from '@etu/events-proto/dist/discord-bot/users'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { config } from '../../../config'
import { discord } from '../../../discord/client'

export class UsersService extends UnimplementedUsersService {
  public async getUserRoles(
    call: ServerUnaryCall<UserFilter, UserRolesResult>,
    callback: sendUnaryData<UserRolesResult>
  ) {
    try {
      let member = discord.guild.members.cache.find((m) => m.user.id === call.request.id)

      if (!member) {
        member = await discord.guild.members.fetch({ user: call.request.id })
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
