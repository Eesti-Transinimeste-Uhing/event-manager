import { SapphireClient } from '@sapphire/framework'
import { GatewayIntentBits } from 'discord.js'

import { config } from './config'
import { log } from './log'

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})

const main = async () => {
  await client.login(config.discord.token)
  log.info('Bot started')
}

main().catch(console.error)
