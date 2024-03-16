export type Config = {
  node: {
    env: 'production' | 'development'
  }
  backend: {
    graphqlUrl: string
  }
}
