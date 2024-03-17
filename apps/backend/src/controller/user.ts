import VError from 'verror'
import { User } from '../entity/user'
import { refreshDiscordAccessToken } from '../lib/discord-refresh-token'
import { AppDataSource } from '../data-source'
import { UserRepository } from '../repository/user'
import { DateTime } from 'luxon'

export class UserController {
  private manager = AppDataSource.createEntityManager()

  private users = this.manager.withRepository(UserRepository)

  async refreshDiscordAccessToken(user: User) {
    try {
      const { accessToken, refreshToken, expiresIn } = await refreshDiscordAccessToken(
        user.refreshToken
      )

      user.accessToken = accessToken
      user.refreshToken = refreshToken
      user.accessTokenExpiresAt = DateTime.utc().plus({ seconds: expiresIn }).toJSDate()

      await this.manager.transaction(async (manager) => {
        await manager.save(user)
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new VError(error, 'Refreshing user access token')
      } else {
        throw error
      }
    }
  }

  async serialise(user: User) {
    return user.id
  }

  async deserialise(userId: string) {
    return await this.users.findOneBy({ id: userId })
  }
}
