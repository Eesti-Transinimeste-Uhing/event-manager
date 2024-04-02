import { ReadStream } from 'node:fs'
import stream from 'node:stream/promises'

import { Storage } from '../lib/storage'

import { ReadableStream } from 'stream/web'
import { downloadDiscordAvatar } from '../lib/discord-profile-picture'

export class DiscordAvatarsStorage extends Storage {
  constructor() {
    super('discord-avatars')
  }

  public override exists = (id: string) => {
    return this.existsFile(id)
  }

  public override get = async (discordId: string, avatarId?: string) => {
    if (avatarId && !(await this.existsFile(discordId))) {
      const blob = await downloadDiscordAvatar(discordId, avatarId)
      await this.putFile(discordId, blob.stream())
    }

    return await this.getFile(discordId)
  }

  public override put = async (discordId: string, banner: ReadStream | ReadableStream) => {
    const writeStream = await this.createWriteStream(discordId)

    await stream.pipeline(banner, writeStream)
  }

  public override delete = async (discordId: string) => {
    await this.deleteFile(discordId)
  }
}
