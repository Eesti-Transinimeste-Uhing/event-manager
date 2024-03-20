import { FastifyPluginCallback } from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

import { config } from '../../../../config'

export const staticFiles: FastifyPluginCallback = async (server, opts, done) => {
  await server.register(fastifyStatic, {
    root: path.resolve(process.cwd(), config.mounts.staticFiles),
    prefix: '/static/',
    cacheControl: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  })
}
