import 'reflect-metadata'

import { config } from './config'
import { log } from './log'
import { createServer } from './server'
import { AppDataSource } from './data-source'

import { ProtoServer } from './proto/server'

const main = async () => {
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

main().catch(console.error)
