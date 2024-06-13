import { getLevel, getNumber, getString, getStringArray } from './validators'
import { Config } from './types'

const getConfig = (): Config => {
  return {
    discord: {
      controlGuildId: getString('DISCORD_CONTROL_GUILD_ID', process.env.DISCORD_CONTROL_GUILD_ID),
      clientId: getString('DISCORD_CLIENT_ID', process.env.DISCORD_CLIENT_ID),
      token: getString('DISCORD_TOKEN', process.env.DISCORD_TOKEN),
      role: {
        admin: getString('DISCORD_ROLE_ID_ADMIN', process.env.DISCORD_ROLE_ID_ADMIN),
        editor: getString('DISCORD_ROLE_ID_EDITOR', process.env.DISCORD_ROLE_ID_EDITOR),
        publisher: getString('DISCORD_ROLE_ID_PUBLISHER', process.env.DISCORD_ROLE_ID_PUBLISHER),
      },
      user: {
        owners: getStringArray('DISCORD_USER_ID_OWNERS', process.env.DISCORD_USER_ID_OWNERS),
      },
    },
    log: {
      level: getLevel('LOG_LEVEL', process.env.LOG_LEVEL),
    },
    node: {
      env: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    },
    rpc: {
      server: {
        host: getString('RPC_SERVER_HOST', process.env.RPC_SERVER_HOST),
        port: getNumber('RPC_SERVER_PORT', process.env.RPC_SERVER_PORT),
      },
      clients: {
        backend: {
          host: getString('RPC_CLIENTS_BACKEND_HOST', process.env.RPC_CLIENTS_BACKEND_HOST),
          port: getNumber('RPC_CLIENTS_BACKEND_PORT', process.env.RPC_CLIENTS_BACKEND_PORT),
        },
      },
    },
  }
}

export const config = getConfig()
