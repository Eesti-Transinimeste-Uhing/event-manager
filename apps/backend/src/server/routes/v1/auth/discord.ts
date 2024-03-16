import passport from '@fastify/passport'
import { FastifyPluginCallback, FastifyRequest, RouteHandler } from 'fastify'
import { config } from '../../../../config'
import { AuthenticateOptions } from '@fastify/passport/dist/AuthenticationRoute'

type Query = { code: string }

export const discordAuth: FastifyPluginCallback = (server, opts, done) => {
  server.get<{ Querystring: Query }>(
    '/auth/discord/callback',
    {
      preValidation: passport.authenticate('discord', {
        authInfo: false,
        failureRedirect: `${config.web.routes.discordAuthFailed}?message=${encodeURIComponent('Authentication cancelled')}`,
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
    } as AuthenticateOptions)
  )

  done()
}
