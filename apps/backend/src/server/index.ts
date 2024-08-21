import fastify from 'fastify'

import * as v1Routes from './routes/v1'
import { registerMiddleware } from './middleware'
import { config } from '../config'

export const createServers = async () => {
  const httpServer = fastify({ trustProxy: config.server.trustProxy })

  await registerMiddleware(httpServer)

  for (const route of Object.values(v1Routes)) {
    await httpServer.register(route, { prefix: '/v1' })
  }

  return { httpServer }
}
