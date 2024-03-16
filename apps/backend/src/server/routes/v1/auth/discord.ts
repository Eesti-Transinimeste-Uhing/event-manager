import passport from '@fastify/passport'
import { FastifyPluginCallback, FastifyRequest, RouteHandler } from 'fastify'
import { config } from '../../../../config'

export const discordAuth: FastifyPluginCallback = (server, opts, done) => {
  server.get(
    '/auth/discord/callback',
    {
      preValidation: passport.authenticate('discord', {
        authInfo: false,
        failureRedirect: config.web.routes.discordAuthFailed,
      }),
    },
    (req, res) => {
      return res.redirect(config.web.routes.discordAuthSuccess)
    }
  )

  server.get(
    '/auth/discord',
    passport.authenticate('discord', {
      permissions: 17998060453952,
    } as any)
  )

  done()
}
