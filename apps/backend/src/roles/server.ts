import { Logger } from 'pino'

import { config } from '../config'
import { createServer } from '../server'
import { AppDataSource } from '../data-source'

import { ProtoServer } from '../proto/server'

export const main = async (log: Logger) => {
  log.debug(`connecting to database`)
  await AppDataSource.initialize()

  log.debug('creating HTTP server')
  const httpServer = await createServer()

  log.debug('creating RPC server')
  const rpcServer = new ProtoServer()

  log.debug('starting servers')
  await httpServer.listen({
    host: config.server.host,
    port: config.server.port,
  })
  await rpcServer.listen()

  log.info(
    {
      host: config.server.host,
      port: config.server.port,
    },
    'server listening'
  )
}
