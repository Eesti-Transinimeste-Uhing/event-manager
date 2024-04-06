import { FastifyPluginCallback } from 'fastify'

import { formController } from '../../../static-context'

type Params = { formId: string }

export const formBannerRoute: FastifyPluginCallback = async (server, opts, done) => {
  server.get<{ Params: Params }>('/static/form-banner/:formId/:cachebust?', async (req, reply) => {
    const banner = await formController.getBanner(req.params.formId)

    if (!banner) {
      return reply.code(404).send('404 Not Found')
    }

    return reply.header('content-type', 'image/jpeg').send(banner)
  })
}
