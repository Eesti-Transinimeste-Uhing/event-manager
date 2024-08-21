import { FastifyPluginCallback } from 'fastify'
import { flags } from '../../../lib/flags'

type Params = { discordId: string }

export const statusRoute: FastifyPluginCallback = async (server, opts, done) => {
  server.get<{ Params: Params }>(
    '/status',
    async (req, reply) => {
      if (!flags.status()) {
        return reply.code(502).send()
      }

      return reply.code(200).send()
    }
  )
}
