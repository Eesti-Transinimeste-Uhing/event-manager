import { Logger } from 'pino'

import { config } from '../config'
import { createServers } from '../server'
import { AppDataSource } from '../data-source'

import { ProtoServer } from '../proto/server'
import { pubsub } from '../pubsub'

import { flags } from '../lib/flags'

export const main = async (log: Logger) => {
  log.debug(`connecting to database`)
  await AppDataSource.initialize()

  log.debug('creating HTTP server')
  const { httpServer } = await createServers()

  log.debug('creating RPC server')
  const rpcServer = new ProtoServer()

  log.debug('starting servers')
  await httpServer.listen({
    host: config.server.host,
    port: config.server.port,
  })
  await rpcServer.listen()

  log.debug('starting flagsmith')
  await flags.init()

  log.info(
    {
      host: config.server.host,
      port: config.server.port,
    },
    'server listening'
  )

  setInterval(() => {
    pubsub.publish('TEST_CLOCK', { time: new Date().getTime() })
  }, 1000)
}
