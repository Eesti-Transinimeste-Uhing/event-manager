import refresh from 'passport-oauth2-refresh'
import VError from 'verror'

type RefreshResult = {
  token_type: string
  access_token: string
  expires_in: number
  scope: string
}

type ResolveValue = {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export const refreshDiscordAccessToken = (refreshToken: string): Promise<ResolveValue> => {
  return new Promise((resolve, reject) => {
    refresh.requestNewAccessToken(
      'discord',
      refreshToken,
      (error, accessToken, refreshToken, result: RefreshResult) => {
        if (error) {
          return reject(new VError(`Fetching new access token: ${JSON.stringify(error)}`))
        }

        return resolve({ accessToken, refreshToken, expiresIn: result.expires_in })
      }
    )
  })
}
