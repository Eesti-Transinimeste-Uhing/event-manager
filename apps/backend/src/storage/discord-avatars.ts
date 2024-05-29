import { ReadStream } from 'node:fs'
import stream from 'node:stream/promises'
import { DateTime } from 'luxon'

import { Storage } from '../lib/storage'

import { ReadableStream } from 'stream/web'
import { downloadDiscordAvatar } from '../lib/discord-profile-picture'
import { config } from '../config'

export class DiscordAvatarsStorage extends Storage {
  constructor() {
    super('discord-avatars')
  }

  public override exists = (id: string) => {
    return this.existsFile(id)
  }

  public override get = async (discordId: string, avatarId?: string) => {
    if (config.server.storageCache.includes(this.directory) && (await this.existsFile(discordId))) {
      return await this.getFile(discordId)
    }

    if (avatarId) {
      const buffer = await downloadDiscordAvatar(discordId, avatarId)
      await this.putFile(discordId, buffer)
    }

    return await this.getFile(discordId)
  }

  public override put = async (discordId: string, banner: Buffer) => {
    const writeStream = await this.createWriteStream(discordId)

    await stream.pipeline(banner, writeStream)
  }

  public override delete = async (discordId: string) => {
    await this.deleteFile(discordId)
  }
}
