import { SapphireClient } from '@sapphire/framework'
import { GatewayIntentBits } from 'discord.js'

import { config } from './config'
import { log } from './log'
import { PinoLogger } from './log/sapphire'
import { ProtoServer } from './proto/server'

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  logger: {
    instance: new PinoLogger(log.child({ source: 'sapphire' })),
    level: PinoLogger.pinoToSapphireLevel(config.log.level),
  },
})

const main = async () => {
  log.debug('starting proto server')
  const rpcServer = new ProtoServer()
  await rpcServer.listen()

  log.debug('logging into Discord')
  await client.login(config.discord.token)

  log.info('bot started')
}

main().catch(console.error)
