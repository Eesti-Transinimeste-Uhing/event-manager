import { Server, ServerCredentials } from '@grpc/grpc-js'

import { config } from '../../config'

import { UsersService } from './services/users'
import { AnnouncerService } from './services/announcer'

export class ProtoServer extends Server {
  constructor() {
    super()

    this.addService(UsersService.definition, new UsersService())
    this.addService(AnnouncerService.definition, new AnnouncerService())
  }

  listen(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bindAsync(
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
}
