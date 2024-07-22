import { FastifyInstance } from 'fastify'

import { log } from '../../log'

import { registerApollo } from './apollo'
import { registerHelmet } from './helmet'
import { registerPassport } from './passport'

export const registerMiddleware = async (server: FastifyInstance) => {
  log.debug('registering middleware')

  await registerApollo(server)
  await registerHelmet(server)
  await registerPassport(server)
}
