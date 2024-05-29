import fetch from 'node-fetch-retry'
import { streamToBuffer } from './stream-to-buffer'

export const downloadDiscordAvatar = async (userId: string, avatarId: string): Promise<Buffer> => {
  const resp = await fetch(`https://cdn.discordapp.com/avatars/${userId}/${avatarId}`, {
    retry: 3,
    pause: 1000,
    silent: true,
  })

  const blob: Blob = await resp.blob()

  return await streamToBuffer(blob.stream())
}
