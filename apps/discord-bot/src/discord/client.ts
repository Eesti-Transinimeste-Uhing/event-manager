import { SapphireClient } from '@sapphire/framework'
import { GatewayIntentBits, Guild, REST, Routes } from 'discord.js'

import { PinoLogger } from '../log/sapphire'
import { log } from '../log'
import { config } from '../config'
import VError from 'verror'

class Client extends SapphireClient {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
      logger: {
        instance: new PinoLogger(log.child({ source: 'sapphire' })),
        level: PinoLogger.pinoToSapphireLevel(config.log.level),
      },
    })

    // Init will assign this
    this.controlGuild = undefined as unknown as Guild
  }

  public controlGuild: Guild

  public async init() {
    await this.login(config.discord.token)

    const guild = this.guilds.cache.find((guild) => guild.id === config.discord.controlGuildId)

    if (!guild) {
      throw new VError(`Control guild not found by id "${config.discord.controlGuildId}"`)
    }

    this.controlGuild = guild
  }

  // Not called at the moment on purpose
  public async clearSlashCommands() {
    const rest = new REST().setToken(config.discord.token)

    // Clear all commands
    await rest.put(Routes.applicationCommands(config.discord.clientId), { body: [] })
  }
}

export const discord = new Client()
