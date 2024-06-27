import { Logger } from 'pino'

import { AppDataSource } from '../data-source'

import { createWorkers } from '../queues'

export const main = async (log: Logger) => {
  log.debug(`connecting to database`)
  await AppDataSource.initialize()

  log.debug('starting workers')
  const workers = createWorkers()

  workers.announce.on('error', (error) => log.error(error))
  workers.announce.on('failed', (error) => log.error(error))

  workers.announceDiscord.on('error', (error) => log.error(error))
  workers.announceDiscord.on('failed', (error) => log.error(error))

  log.info('worker running')
}
