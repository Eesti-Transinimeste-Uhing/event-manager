import * as Pino from 'pino'

export type Config = {
  secureSession: {
    key: string
  }
  node: {
    env: 'production' | 'development'
  }
  log: {
    level: Pino.Level
  }
  server: {
    host: string
    port: number
  }
  discord: {
    clientId: string
    clientSecret: string
    callbackUrl: string
  }
}
