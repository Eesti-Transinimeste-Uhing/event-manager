import { getLevel, getNumber, getString } from './validators'
import { Config } from './types'

const getConfig = (): Config => {
  return {
    secureSession: {
      key: getString('SECURE_SESSION_KEY', process.env.SECURE_SESSION_KEY),
    },
    log: {
      level: getLevel('LOG_LEVEL', process.env.LOG_LEVEL),
    },
    node: {
      env: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    },
    server: {
      host: getString('SERVER_HOST', process.env.SERVER_HOST),
      port: getNumber('SERVER_PORT', process.env.SERVER_PORT),
    },
    discord: {
      clientId: getString('DISCORD_CLIENT_ID', process.env.DISCORD_CLIENT_ID),
      clientSecret: getString('DISCORD_CLIENT_SECRET', process.env.DISCORD_CLIENT_SECRET),
      callbackUrl: getString('DISCORD_CALLBACK_URL', process.env.DISCORD_CALLBACK_URL),
    },
    db: {
      host: getString('DB_HOST', process.env.DB_HOST),
      port: getNumber('DB_PORT', process.env.DB_PORT),
      username: getString('DB_USERNAME', process.env.DB_USERNAME),
      password: getString('DB_PASSWORD', process.env.DB_PASSWORD),
      database: getString('DB_NAME', process.env.DB_NAME),
    },
    web: {
      corsOrigin: getString('WEB_CORS_ORIGIN', process.env.WEB_CORS_ORIGIN),
      routes: {
        discordAuthFailed: getString(
          'WEB_DISCORD_AUTH_FAILURE',
          process.env.WEB_DISCORD_AUTH_FAILURE
        ),
        discordAuthSuccess: getString(
          'WEB_DISCORD_AUTH_SUCCESS',
          process.env.WEB_DISCORD_AUTH_SUCCESS
        ),
      },
    },
  }
}

export const config = getConfig()
