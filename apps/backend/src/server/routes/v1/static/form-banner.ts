import { FastifyPluginCallback } from 'fastify'

import { templateBanners } from '../../../../storage'
import { formController } from '../../../static-context'

type Params = { formId: string }

export const formBannerRoute: FastifyPluginCallback = async (server, opts, done) => {
  server.get<{ Params: Params }>('/static/form-banner/:formId/:cachebust?', async (req, reply) => {
    const form = await formController.getById(req.params.formId)
    const template = await form?.template

    if (!template) {
      return reply.code(404).send('404 Not Found')
    }

    const banner = await templateBanners.cropAndGet(template.id)

    if (!banner) {
      return reply.code(404).send('404 Not Found')
    }

    return reply.header('content-type', 'image/jpeg').send(banner)
  })
}
