import { Strategy } from '@fastify/passport'
import { Strategy as DiscordStrategy } from 'passport-discord'
import { config } from '../../config'

const scopes = ['identify', 'email', 'guilds']

export const discordStrategy = new DiscordStrategy(
  {
    clientID: config.discord.clientId,
    clientSecret: config.discord.clientSecret,
    callbackURL: config.discord.callbackUrl,
    scope: scopes,
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, {
      id: '1',
      name: 'DecentM',
    })
  }
) as Strategy
