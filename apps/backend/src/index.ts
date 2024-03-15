import Fastify from 'fastify'
import { ApolloServer, BaseContext } from '@apollo/server'
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify'

import { config } from './config'
import { log } from './log'
import { schema } from './graphql/schema'
import { server } from './server'

const main = async () => {
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(server)],
  })

  await apollo.start()

  await server.register(fastifyApollo(apollo))

  await server.listen({
    host: config.server.host,
    port: config.server.port,
  })

  log.info(
    {
      host: config.server.host,
      port: config.server.port,
    },
    'server listening'
  )
}

main().catch(console.error)
