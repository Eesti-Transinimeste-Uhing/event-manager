import * as Pino from 'pino'

export type Config = {
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
