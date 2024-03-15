import { getLevel, getString } from './validators'
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
  }
}

export const config = getConfig()
