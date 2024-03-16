import { getString } from './validators'
import { Config } from './types'

const getConfig = (): Config => {
  return {
    node: {
      env: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    },
    backend: {
      graphqlUrl: getString('GRAPHQL_URL', process.env.GRAPHQL_URL),
    },
  }
}

export const config = getConfig()
