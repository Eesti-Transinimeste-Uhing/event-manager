import { getLevel, getNumber, getString, getWritablePath } from './validators'
import { Config } from './types'

const getConfig = (): Config => {
  return {
    role: getString('PROCESS_ROLE', process.env.PROCESS_ROLE).split(',') as Config['role'],
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
      publicUrl: getString('SERVER_PUBLIC_URL', process.env.SERVER_PUBLIC_URL),
      trustProxy: getString('SERVER_TRUST_PROXY', process.env.SERVER_TRUST_PROXY) === 'true',
      storageCache: getString('SERVER_STORAGE_CACHE', process.env.SERVER_STORAGE_CACHE).split(','),
    },
    valkey: {
      host: getString('VALKEY_HOST', process.env.VALKEY_HOST),
      port: getNumber('VALKEY_PORT', process.env.VALKEY_PORT),
      db: getNumber('VALKEY_DB', process.env.VALKEY_DB),
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
      sync: getString('DB_SYNC', process.env.DB_SYNC) === 'true',
      migrate: getString('DB_MIGRATE', process.env.DB_MIGRATE) === 'true',
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
        loginUrl: getString('WEB_LOGIN_URL', process.env.WEB_LOGIN_URL),
      },
    },
    mounts: {
      staticFiles: getWritablePath('STATIC_FILES_MOUNT', process.env.STATIC_FILES_MOUNT),
    },
    rpc: {
      server: {
        host: getString('RPC_SERVER_HOST', process.env.RPC_SERVER_HOST),
        port: getNumber('RPC_SERVER_PORT', process.env.RPC_SERVER_PORT),
      },
      clients: {
        discordBot: {
          host: getString('RPC_CLIENTS_DISCORD_BOT_HOST', process.env.RPC_CLIENTS_DISCORD_BOT_HOST),
          port: getNumber('RPC_CLIENTS_DISCORD_BOT_PORT', process.env.RPC_CLIENTS_DISCORD_BOT_PORT),
        },
      },
    },
  }
}

export const config = getConfig()
