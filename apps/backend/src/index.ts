import 'reflect-metadata'
import { ApolloServer, BaseContext } from '@apollo/server'
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify'

import { config } from './config'
import { log } from './log'
import { schema } from './graphql/schema'
import { server } from './server'
import { AppDataSource } from './data-source'

const main = async () => {
  log.debug(`connecting to database`)
  await AppDataSource.initialize()

  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(server)],
  })

  log.debug('starting server')
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
