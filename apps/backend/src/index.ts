import 'reflect-metadata'

import { UserFilter } from '@etu/events-proto'
import { usersClient } from './proto/clients/discord-bot'

import { config } from './config'
import { log } from './log'
import { createServer } from './server'
import { AppDataSource } from './data-source'

const main = async () => {
  log.debug(`connecting to database`)
  await AppDataSource.initialize()

  log.debug('creating server')
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

  console.log(
    'I AM ADMIN:',
    (await usersClient.isAdmin(new UserFilter({ id: '230783458459385856' }))).result
  )
}

main().catch(console.error)
