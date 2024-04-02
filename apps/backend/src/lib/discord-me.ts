import fetch from 'node-fetch-retry'

export type DiscordOauthInfo = {
  id: string
  username: string
  avatar: string
  banner?: string | null
  accent_color: number
  global_name: string
  banner_color: string
  mfa_enabled: boolean
  locale: string
  email: string
  verified: boolean
}

export const fetchDiscordMe = async (token: string): Promise<DiscordOauthInfo> => {
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `Bearer ${token}`,
    },
    retry: 3,
    pause: 1000,
    silent: true,
  })

  return await response.json()
}
