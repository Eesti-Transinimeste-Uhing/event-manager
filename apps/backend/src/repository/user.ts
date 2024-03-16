import { AppDataSource } from '../data-source'
import { User } from '../entity/user'

export const UserRepository = AppDataSource.getRepository(User).extend({
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

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(user)
    })

    return user
  },
})
