import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import passport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import { config } from '../config'

import { discordStrategy } from './auth-strategies/discord'

export const server = fastify()

// register a serializer that stores the user object's id in the session ...
passport.registerUserSerializer(async (user, request) => '1')

// ... and then a deserializer that will fetch that user from the database when a request with an id in the session arrives
passport.registerUserDeserializer(async (id, request) => {
  return {
    id: '1',
    name: 'DecentM',
  }
})

// set up secure sessions for @fastify/passport to store data in
server.register(fastifySecureSession, { key: Buffer.from(config.secureSession.key) })
// initialize @fastify/passport and connect it to the secure-session storage. Note: both of these plugins are mandatory.
server.register(passport.initialize())
server.register(passport.secureSession())

// register an example strategy for fastifyPassport to authenticate users using
passport.use(discordStrategy) // you'd probably use some passport strategy from npm here

// Add an authentication for a route which will use the strategy named "test" to protect the route
server.get(
  '/auth/discord/callback',
  { preValidation: passport.authenticate('discord', { authInfo: false }) },
  async () => 'hello world!'
)

server.get('/auth/discord', passport.authenticate('discord'))
