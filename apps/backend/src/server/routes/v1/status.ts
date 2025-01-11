import { FastifyPluginCallback } from 'fastify'

type Params = { discordId: string }

export const statusRoute: FastifyPluginCallback = async (server, opts, done) => {
  server.get<{ Params: Params }>(
    '/status',
    async (req, reply) => {
      return reply.code(200).send()
    }
  )
}
