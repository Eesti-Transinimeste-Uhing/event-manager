import 'reflect-metadata'
import VError from 'verror'

import { config } from './config'
import { log } from './log'

import { main as serverRole } from './roles/server'
import { main as workerRole } from './roles/worker'

const main = async () => {
  await Promise.all(
    config.role.map((role) => {
      switch (role) {
        case 'server':
          log.debug('starting server role')
          return serverRole(log.child({ role: 'server' }))
        case 'worker':
          log.debug('starting worker role')
          return workerRole(log.child({ role: 'worker' }))
        default:
          throw new VError(`Role "${role}" does not exist`)
      }
    })
  )
}

main().catch(console.error)
