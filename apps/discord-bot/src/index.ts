import { SapphireClient } from '@sapphire/framework'
import { GatewayIntentBits } from 'discord.js'

import { config } from './config'
import { log } from './log'
import { PinoLogger } from './log/sapphire'

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  logger: {
    instance: new PinoLogger(log.child({ source: 'sapphire' })),
    level: PinoLogger.pinoToSapphireLevel(config.log.level),
  },
})

const main = async () => {
  await client.login(config.discord.token)
  log.info('Bot started')
}

main().catch(console.error)
