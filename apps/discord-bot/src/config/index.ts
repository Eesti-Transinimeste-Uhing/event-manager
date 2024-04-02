import { getLevel, getNumber, getString } from './validators'
import { Config } from './types'

const getConfig = (): Config => {
  return {
    discord: {
      token: getString('DISCORD_TOKEN', process.env.DISCORD_TOKEN),
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
    },
  }
}

export const config = getConfig()
