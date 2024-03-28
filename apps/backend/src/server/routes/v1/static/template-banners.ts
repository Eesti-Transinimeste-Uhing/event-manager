import { FastifyPluginCallback } from 'fastify'

import { templateBanners } from '../../../../storage'

type Params = { templateId: string }

export const staticFiles: FastifyPluginCallback = async (server, opts, done) => {
  server.get<{ Params: Params }>('/static/template-banner/:templateId', async (req, reply) => {
    const banner = await templateBanners.get(req.params.templateId)

    if (!banner) {
      return reply.code(404).send('404 Not Found')
    }

    return reply.header('content-type', 'image/png').send(banner)
  })
}
