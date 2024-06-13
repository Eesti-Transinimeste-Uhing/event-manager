import { Logger } from 'pino'

import { AppDataSource } from '../data-source'

import * as Announce from '../queues/announce'

export const main = async (log: Logger) => {
  log.debug(`connecting to database`)
  await AppDataSource.initialize()

  log.debug('starting announce worker')
  const announceWorker = Announce.createWorker()
  await announceWorker.waitUntilReady()
  await announceWorker.resume()

  announceWorker.on('error', (error) => log.error(error))
  announceWorker.on('failed', (error) => log.error(error))

  log.info('worker running')
}
