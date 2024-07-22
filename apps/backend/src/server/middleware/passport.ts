import { FastifyInstance } from 'fastify'

import passport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import refresh from 'passport-oauth2-refresh'

import { config } from '../../config'
import { discordStrategy } from '../auth-strategies/discord'
import { User } from '../../entity/user'
import { userController } from '../static-context'

export const registerPassport = async (server: FastifyInstance) => {
  // register a serializer that stores the user object's id in the session ...
  passport.registerUserSerializer((user: User) => userController.serialise(user))

  // ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
  passport.registerUserDeserializer((id: string) => userController.deserialise(id))

  await server.register(fastifySecureSession, {
    key: Buffer.from(config.secureSession.key),
    cookie: {
      httpOnly: true,
      secure: config.node.env !== 'development',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // in seconds, 7 days
    },
  })

  await server.register(passport.initialize())
  await server.register(passport.secureSession())

  passport.use(discordStrategy)
  refresh.use(discordStrategy as any)
}
