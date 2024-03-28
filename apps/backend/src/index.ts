import 'reflect-metadata'

import { config } from './config'
import { log } from './log'
import { createServer } from './server'
import { AppDataSource } from './data-source'

const main = async () => {
  log.debug(`connecting to database`)
  await AppDataSource.initialize()
  const server = await createServer()

  log.debug('starting server')

  await server.listen({
    host: config.server.host,
    port: config.server.port,
  })

  log.info(
    {
      host: config.server.host,
      port: config.server.port,
    },
    'server listening'
  )
}

main().catch(console.error)
