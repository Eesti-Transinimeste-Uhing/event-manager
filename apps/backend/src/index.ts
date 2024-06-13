import 'reflect-metadata'

import { config } from './config'
import { log } from './log'
import { createServer } from './server'
import { AppDataSource } from './data-source'

import { ProtoServer } from './proto/server'
import { announcerClient } from './proto/clients/discord-bot'
import { AnnounceFormRequest } from '@etu/events-proto/dist/discord-bot/announcer'

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

  log.info('announcing')

  try {
    await announcerClient.announceForm(
      AnnounceFormRequest.fromObject({
        channelId: '1250913804544376934',
        guildId: '1059811599151550496',
        message: 'Hi!',
      })
    )
  } catch (error) {
    log.error(error)
  }

  log.info('announced')
}

main().catch(console.error)
