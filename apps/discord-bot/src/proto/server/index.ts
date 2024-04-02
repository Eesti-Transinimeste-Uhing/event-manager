import { Server, ServerCredentials } from '@grpc/grpc-js'

import { Client } from '../../discord/client'
import { UsersService } from './services/users'

import { log } from '../../log'
import { config } from '../../config'

const startServer = (server: Server) => {
  return new Promise((resolve, reject) => {
    server.bindAsync(
      `${config.rpc.server.host}:${config.rpc.server.port}`,
      ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          log.error(error, 'starting rpc server')
          return
        }

        log.info({ port }, 'rpc listening')
      }
    )
  })
}

export class ProtoServer extends Server {
  constructor(private client: Client) {
    super()

    this.addService(UsersService.definition, new UsersService(this.client))
  }

  listen() {
    return startServer(this)
  }
}
