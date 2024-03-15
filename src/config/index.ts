import * as Pino from 'pino'

import { getLevel, getString } from './validators'

type Config = {
  node: {
    env: 'production' | 'development'
  }
  discord: {
    token: string
  }
  log: {
    level: Pino.Level
  }
}

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
