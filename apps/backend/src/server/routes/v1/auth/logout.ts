import { FastifyPluginCallback, FastifyRequest, RouteHandler } from 'fastify'
import { config } from '../../../../config'

export const logout: FastifyPluginCallback = (server, opts, done) => {
  server.get('/auth/logout', {}, (req, res) => {
    if (req.session) {
      req.session.delete()
    }

    return res.redirect(config.web.routes.loginUrl)
  })

  done()
}
