import fastify from 'fastify'

import * as v1Routes from './routes/v1'
import { registerMiddleware } from './middleware'
import { config } from '../config'

export const createServer = async () => {
  const server = fastify({ trustProxy: config.server.trustProxy })

  await registerMiddleware(server)

  for (const route of Object.values(v1Routes)) {
    await server.register(route, { prefix: '/v1' })
  }

  return server
}
