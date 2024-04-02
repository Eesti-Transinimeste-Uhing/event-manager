import fetch from 'node-fetch-retry'

export const downloadDiscordAvatar = async (userId: string, avatarId: string): Promise<Blob> => {
  const resp = await fetch(`https://cdn.discordapp.com/avatars/${userId}/${avatarId}`, {
    retry: 3,
    pause: 1000,
    silent: true,
  })

  return resp.blob()
}
