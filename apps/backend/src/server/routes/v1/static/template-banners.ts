import { FastifyPluginCallback } from 'fastify'

import { templateBanners } from '../../../../storage'
import { templateController } from '../../../static-context'

type Params = { templateId: string }

export const templateBannersRoute: FastifyPluginCallback = async (server, opts, done) => {
  server.get<{ Params: Params }>(
    '/static/template-banner/:templateId/:cachebust?',
    async (req, reply) => {
      const template = await templateController.getById(req.params.templateId)

      if (!template) {
        return reply.code(404).send('404 Not Found')
      }

      const banner = await templateBanners.get(req.params.templateId)

      if (!banner) {
        return reply.code(404).send('404 Not Found')
      }

      return reply.header('content-type', 'image/jpeg').send(banner)
    }
  )
}
