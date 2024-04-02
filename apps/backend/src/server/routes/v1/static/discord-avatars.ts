import { FastifyPluginCallback } from 'fastify'

import { discordAvatars } from '../../../../storage'
import { userController } from '../../../static-context'

type Params = { discordId: string }

export const discordAvatarsRoute: FastifyPluginCallback = async (server, opts, done) => {
  server.get<{ Params: Params }>(
    '/static/discord-avatar/:discordId/:cachebust?',
    async (req, reply) => {
      const user = await userController.getByDiscordId(req.params.discordId)

      if (!user) {
        return reply.code(404).send('404 Not Found')
      }

      const avatar = await discordAvatars.get(req.params.discordId)

      if (!avatar) {
        return reply.code(404).send('404 Not Found')
      }

      return reply.header('content-type', 'image/png').send(avatar)
    }
  )
}
