import { FormsClient } from '@etu/events-proto/dist/backend/forms'
import { credentials } from '@grpc/grpc-js'

import { config } from '../../config'

export const formsClient = new FormsClient(
  `${config.rpc.clients.backend.host}:${config.rpc.clients.backend.port}`,
  credentials.createInsecure()
)
