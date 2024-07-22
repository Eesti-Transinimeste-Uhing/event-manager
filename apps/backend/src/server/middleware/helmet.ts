import { FastifyInstance } from 'fastify'

import helmet from '@fastify/helmet'
import cors from '@fastify/cors'

import { config } from '../../config'

export const registerHelmet = async (server: FastifyInstance) => {
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
}
