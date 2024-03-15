import createLogger from 'pino'

import { config } from '../config'

export const log = createLogger({
  level: config.log.level,
  transport:
    config.node.env === 'development'
      ? {
          // https://github.com/pinojs/pino/blob/master/docs/pretty.md
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : undefined,
})
