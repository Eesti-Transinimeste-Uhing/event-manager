import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client/core'
import { PersistentStorage, persistCache } from 'apollo3-cache-persist'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { get, set, del, clear, createStore, UseStore } from 'idb-keyval'

import { config } from 'src/config'

const uploadLink = createUploadLink({
  uri: config.backend.graphqlUrl,
  credentials: 'include',
  headers: {
    'apollo-require-preflight': 'true',
  },
}) as unknown as ApolloLink // L - I think this is for Apollo 2 but it seems to work with 3

const cache = new InMemoryCache()

let store: UseStore

if (typeof window !== 'undefined') {
  store = createStore('apollo', 'cache')

  const storage: PersistentStorage<string> = {
    getItem: async (key: string) => (await get(key, store)) ?? null,
    setItem: (key: string, value: string) => set(key, value, store),
    removeItem: (key: string) => del(key, store),
  }

  persistCache({
    cache,
    storage,
    debounce: 300,
  })
}

export const apolloClient = new ApolloClient({
  cache,
  link: uploadLink,
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
