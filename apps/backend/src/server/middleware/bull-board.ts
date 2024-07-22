import { FastifyInstance } from 'fastify'
import { FastifyAdapter } from '@bull-board/fastify'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'

import { createQueues } from '../../queues'
import { createDynamicContext } from '../dynamic-context'
import { UserRole } from '@etu/events-proto/dist/discord-bot/users'
import { config } from '../../config'

export const registerBullBoard = async (server: FastifyInstance) => {
  const allQueues = createQueues()
  const serverAdapter = new FastifyAdapter()

  createBullBoard({
    queues: Object.values(allQueues).map((queue) => new BullMQAdapter(queue)),
    serverAdapter,
    options: {
      uiConfig: {
        boardTitle: 'Queue Admin',
        miscLinks: [
          {
            text: 'Back to Event Planner',
            url: config.web.corsOrigin,
          },
        ],
      },
    },
  })

  serverAdapter.setBasePath('/bull-board')

  await server.register(serverAdapter.registerPlugin(), {
    basePath: '/',
    prefix: '/bull-board',
  })

  server.addHook('onRequest', async (req, reply) => {
    if (!req.url.startsWith('/bull-board')) {
      return
    }

    const ctx = await createDynamicContext(req, reply)

    if (ctx.user && ctx.roles.includes(UserRole.Admin)) {
      return
    }

    reply.code(403).send('Unauthorized')
  })
}
