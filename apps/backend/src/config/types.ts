import { ConnectionOptions } from 'bullmq'
import * as Pino from 'pino'

export type Config = {
  role: Array<'server' | 'worker'>
  secureSession: {
    key: string
  }
  node: {
    env: 'production' | 'development'
  }
  log: {
    level: Pino.Level
  }
  valkey: ConnectionOptions
  server: {
    host: string
    port: number
    publicUrl: string
    trustProxy: boolean
    storageCache: string[]
  }
  discord: {
    clientId: string
    clientSecret: string
    callbackUrl: string
  }
  db: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }
  web: {
    routes: {
      discordAuthFailed: string
      discordAuthSuccess: string
      loginUrl: string
    }
    corsOrigin: string
  }
  mounts: {
    staticFiles: string
  }
  rpc: {
    server: {
      host: string
      port: number
    }
    clients: {
      discordBot: {
        host: string
        port: number
      }
    }
  }
}
