import { FastifyInstance } from 'fastify'
import { applyMiddleware } from 'graphql-middleware'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'

import { ApolloServer } from '@apollo/server'
import { processRequest } from 'graphql-upload-minimal'
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify'
import { fastifyRequestContext } from '@fastify/request-context'

import { schema } from '../../graphql/schema'
import { DynamicContext, createDynamicContext } from '../dynamic-context'
import { permissions } from '../../graphql/permissions'

export const registerApollo = async (server: FastifyInstance) => {
  await server.register(fastifyRequestContext, {
    defaultStoreValues: {
      isMultipart: false,
    },
  })

  server.addContentTypeParser('multipart', (req, payload, done) => {
    req.requestContext.set('isMultipart' as never, true as never)
    done(null)
  })

  server.addHook('preValidation', async (request, reply) => {
    if (!request.requestContext.get('isMultipart' as never)) {
      return
    }

    try {
      request.body = await processRequest(request.raw, reply.raw, {
        maxFileSize: 5_000_000, // 5 MB
        maxFiles: 20,
      })
    } catch (error) {
      reply.status(400).send('Invalid Request')
    }
  })

  const wsServer = new WebSocketServer({
    server: server.server,
    path: '/graphql',
  })

  const serverCleanup = useServer({ schema, context: createDynamicContext }, wsServer)

  const apollo = new ApolloServer<DynamicContext>({
    schema: applyMiddleware(schema, permissions),
    plugins: [
      fastifyApolloDrainPlugin(server),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await apollo.start()

  await server.register(fastifyApollo(apollo), {
    context: createDynamicContext,
  })
}
