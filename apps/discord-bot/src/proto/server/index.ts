import { Server, ServerCredentials } from '@grpc/grpc-js'

import { UsersService } from './services/users'

import { config } from '../../config'

const startServer = (server: Server): Promise<void> => {
  return new Promise((resolve, reject) => {
    server.bindAsync(
      `${config.rpc.server.host}:${config.rpc.server.port}`,
      ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          return reject(error)
        }

        return resolve()
      }
    )
  })
}

export class ProtoServer extends Server {
  constructor() {
    super()

    this.addService(UsersService.definition, new UsersService())
  }

  listen() {
    return startServer(this)
  }
}
