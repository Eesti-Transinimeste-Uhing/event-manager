import { FastifyInstance } from 'fastify'

import { log } from '../../log'

import { registerApollo } from './apollo'
import { registerHelmet } from './helmet'
import { registerPassport } from './passport'
import { registerBullBoard } from './bull-board'

export const registerMiddleware = async (server: FastifyInstance) => {
  log.debug('registering middleware')

  await registerHelmet(server)
  await registerPassport(server)
  await registerApollo(server)
  await registerBullBoard(server)
}
