import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { config } from 'src/config'

export const apolloClient = new ApolloClient({
  uri: config.backend.graphqlUrl,
  cache: new InMemoryCache(),
})
