import { Events, SapphireClient } from '@sapphire/framework'
import { GatewayDispatchEvents, GatewayIntentBits, Guild, REST, Routes } from 'discord.js'

import { PinoLogger } from '../log/sapphire'
import { log } from '../log'
import { config } from '../config'
import VError from 'verror'

export class Client extends SapphireClient {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
      logger: {
        instance: new PinoLogger(log.child({ source: 'sapphire' })),
        level: PinoLogger.pinoToSapphireLevel(config.log.level),
      },
    })

    // This will be overwritten in init(), so in theory there will be no state
    // where this.guild is null, provided init() is called right after construction
    this.guild = null as unknown as Guild
  }

  public guild: Guild

  public async init() {
    const rest = new REST().setToken(config.discord.token)
    await rest.put(Routes.applicationCommands(config.discord.clientId), { body: [] })

    await this.login(config.discord.token)
    const guild = this.guilds.cache.find((g) => g.id === config.discord.guildId)

    if (!guild) {
      throw new VError(`Guild "${config.discord.guildId}" not found ion cache!`)
    }

    this.guild = guild
  }
}
