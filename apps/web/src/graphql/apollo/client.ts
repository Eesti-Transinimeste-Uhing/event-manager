import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { config } from 'src/config'

const httpLink = new HttpLink({
  uri: config.backend.graphqlUrl,
  credentials: 'include',
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})
