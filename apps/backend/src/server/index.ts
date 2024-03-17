import fastify from 'fastify'
import passport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import refresh from 'passport-oauth2-refresh'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'

import * as routes from './routes/v1'

import { config } from '../config'
import { discordStrategy } from './auth-strategies/discord'
import { User } from '../entity/user'
import { userController } from './static-context'

export const server = fastify()

server.register(helmet, {
  global: true,
  contentSecurityPolicy: false,
})

server.register(cors, {
  origin: config.web.corsOrigin,
  credentials: true,
})

// register a serializer that stores the user object's id in the session ...
passport.registerUserSerializer((user: User) => userController.serialise(user))

// ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
passport.registerUserDeserializer((id: string) => userController.deserialise(id))

server.register(fastifySecureSession, {
  key: Buffer.from(config.secureSession.key),
  cookie: {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 259_200, // in seconds, 3 days
  },
})

server.register(passport.initialize())
server.register(passport.secureSession())

passport.use(discordStrategy)
refresh.use(discordStrategy as any)

for (const route of Object.values(routes)) {
  server.register(route, { prefix: '/v1' })
}
