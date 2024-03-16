import fastify from 'fastify'
import passport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import refresh from 'passport-oauth2-refresh'

import * as routes from './routes/v1'

import { config } from '../config'
import { discordStrategy } from './auth-strategies/discord'
import { User } from '../entity/user'
import { UserRepository } from '../repository/user'

export const server = fastify()

// register a serializer that stores the user object's id in the session ...
passport.registerUserSerializer(async (user: User, request) => {
  return user.id
})

// ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
passport.registerUserDeserializer(async (id: string, request) => {
  return await UserRepository.findOneBy({
    id,
  })
})

server.register(fastifySecureSession, { key: Buffer.from(config.secureSession.key) })

server.register(passport.initialize())
server.register(passport.secureSession())

passport.use(discordStrategy)
refresh.use(discordStrategy)

for (const route of Object.values(routes)) {
  server.register(route, { prefix: '/v1' })
}
