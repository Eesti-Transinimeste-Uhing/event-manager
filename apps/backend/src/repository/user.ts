import { DateTime } from 'luxon'
import { AppDataSource } from '../data-source'
import { User } from '../entity/user'

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByDiscord(profileId: string) {
    return await this.findOneBy({
      discordId: profileId,
    })
  },

  async findOrCreateByDiscord(
    profileId: string,
    accessToken: string,
    refreshToken: string
  ): Promise<User> {
    let user = await this.findOneBy({
      discordId: profileId,
    })

    if (!user) {
      user = this.create()
    }

    user.accessToken = accessToken
    user.refreshToken = refreshToken
    user.discordId = profileId
    user.accessTokenExpiresAt = DateTime.utc().plus({ days: 7 }).toJSDate()

    await this.manager.transaction(async (manager) => {
      await manager.save(user)
    })

    return user
  },
})
