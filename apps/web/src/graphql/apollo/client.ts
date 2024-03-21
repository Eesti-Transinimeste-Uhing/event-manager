import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { PersistentStorage, persistCache } from 'apollo3-cache-persist'
import { get, set, del, clear, createStore, UseStore } from 'idb-keyval'

import { config } from 'src/config'

const httpLink = new HttpLink({
  uri: config.backend.graphqlUrl,
  credentials: 'include',
})

const cache = new InMemoryCache()

let store: UseStore

if (typeof window !== 'undefined') {
  store = createStore('apollo', 'cache')

  const storage: PersistentStorage<string> = {
    getItem: async (key: string) => (await get(key, store)) ?? null,
    setItem: (key: string, value: string) => set(key, value, store),
    removeItem: (key: string) => del(key, store),
  }

  persistCache({ cache, storage })
}

export const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
  defaultOptions: {
    query: {
      errorPolicy: 'ignore',
      fetchPolicy: 'cache-first',
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
  },
})

apolloClient.onResetStore(async () => {
  if (store) await clear(store)
})
