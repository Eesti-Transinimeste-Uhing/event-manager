import { boot } from 'quasar/wrappers'
import { apolloClient } from 'src/graphql/apollo/client'

export default boot(async ({ app }) => {
  const { DefaultApolloClient } = await import('@vue/apollo-composable')

  app.provide(DefaultApolloClient, apolloClient)
})
