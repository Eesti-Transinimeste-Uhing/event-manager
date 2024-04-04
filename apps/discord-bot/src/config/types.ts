import * as Pino from 'pino'

export type Config = {
  node: {
    env: 'production' | 'development'
  }
  discord: {
    guildId: string
    clientId: string
    token: string
    role: {
      publisher: string
      editor: string
      admin: string
    }
    user: {
      owners: string[]
    }
  }
  log: {
    level: Pino.Level
  }
  rpc: {
    server: {
      host: string
      port: number
    }
    clients: {
      backend: {
        host: string
        port: number
      }
    }
  }
}
