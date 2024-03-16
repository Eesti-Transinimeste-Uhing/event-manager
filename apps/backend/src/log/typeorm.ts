import * as Pino from 'pino'
import { AbstractLogger, LogLevel, LogMessage, QueryRunner } from 'typeorm'

export class PinoLogger extends AbstractLogger {
  constructor(private pino: Pino.Logger) {
    super()
  }

  /**
   * Write log to specific output.
   */
  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    queryRunner?: QueryRunner
  ) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    })

    for (let message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          this.pino.info(message.message)
          break

        case 'info':
        case 'query':
          if (message.prefix) {
            this.pino.debug(
              {
                prefix: message.prefix,
              },
              String(message.message)
            )
          } else {
            this.pino.debug(message.message)
          }
          break

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            this.pino.warn({ prefix: message.prefix }, String(message.message))
          } else {
            this.pino.warn(message.message)
          }
          break

        case 'error':
        case 'query-error':
          if (message.prefix) {
            this.pino.error({ prefix: message.prefix }, String(message.message))
          } else {
            this.pino.error(message.message)
          }
          break
      }
    }
  }
}
