import { getString } from './validators'
import { Config } from './types'

const getConfig = (): Config => {
  return {
    node: {
      env: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    },
    backend: {
      graphqlUrl: getString('GRAPHQL_URL', process.env.GRAPHQL_URL),
      logoutUrl: getString('SERVER_LOGOUT_URL', process.env.SERVER_LOGOUT_URL),
      loginUrl: getString('SERVER_LOGIN_URL', process.env.SERVER_LOGIN_URL),
    },
    flagsmith: {
      realtime: getString('FLAGSMITH_REALTIME', process.env.FLAGSMITH_REALTIME) === 'true',
      api: getString('FLAGSMITH_API_URL', process.env.FLAGSMITH_API_URL),
      environmentID: getString('FLAGSMITH_ENVIRONMENT_KEY', process.env.FLAGSMITH_ENVIRONMENT_KEY),
    },
  }
}

export const config = getConfig()
