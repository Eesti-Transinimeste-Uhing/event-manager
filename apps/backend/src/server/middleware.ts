import { FastifyInstance } from 'fastify'

import passport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import refresh from 'passport-oauth2-refresh'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'

import { config } from '../config'
import { discordStrategy } from './auth-strategies/discord'
import { User } from '../entity/user'
import { userController } from './static-context'

import { ApolloServer } from '@apollo/server'
import { processRequest } from 'graphql-upload-minimal'
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify'
import { fastifyRequestContext } from '@fastify/request-context'

import { schema } from '../graphql/schema'
import { GraphqlContext, graphqlContextFunction } from '../graphql/context'
import { log } from '../log'

export const registerMiddleware = async (server: FastifyInstance) => {
  log.debug('registering middleware')

  /**
   * GraphQL
   */

  await server.register(fastifyRequestContext, {
    defaultStoreValues: {
      isMultipart: false,
    },
  })

  server.addContentTypeParser('multipart', (req, payload, done) => {
    req.requestContext.set('isMultipart' as never, true as never)
    done(null)
  })

  server.addHook('preValidation', async function (request, reply) {
    if (!request.requestContext.get('isMultipart' as never)) {
      return
    }

    try {
      request.body = await processRequest(request.raw, reply.raw, {
        maxFileSize: 5_000_000, // 5 MB
        maxFiles: 20,
      })
    } catch (error) {
      reply.status(400).send('400 Invalid Request')
    }
  })

  const apollo = new ApolloServer<GraphqlContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(server)],
  })

  await apollo.start()
  await server.register(fastifyApollo(apollo), {
    context: graphqlContextFunction,
  })

  /**
   * Security
   */

  await server.register(helmet, {
    global: true,
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })

  await server.register(cors, {
    origin: config.web.corsOrigin,
    credentials: true,
  })

  /**
   * Authentication
   */

  // register a serializer that stores the user object's id in the session ...
  passport.registerUserSerializer((user: User) => userController.serialise(user))

  // ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
  passport.registerUserDeserializer((id: string) => userController.deserialise(id))

  await server.register(fastifySecureSession, {
    key: Buffer.from(config.secureSession.key),
    cookie: {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // in seconds, 7 days
    },
  })

  await server.register(passport.initialize())
  await server.register(passport.secureSession())

  passport.use(discordStrategy)
  refresh.use(discordStrategy as any)
}
