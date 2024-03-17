import { Strategy as DiscordStrategy } from 'passport-discord'
import { config } from '../../config'
import { UserRepository } from '../../repository/user'

const scopes = ['identify']

export const discordStrategy = new DiscordStrategy(
  {
    clientID: config.discord.clientId,
    clientSecret: config.discord.clientSecret,
    callbackURL: config.discord.callbackUrl,
    scope: scopes,
  },
  async (accessToken, refreshToken, profile, cb) => {
    const user = await UserRepository.findOrCreateByDiscord(profile.id, accessToken, refreshToken)

    return cb(null, user)
  }
)
