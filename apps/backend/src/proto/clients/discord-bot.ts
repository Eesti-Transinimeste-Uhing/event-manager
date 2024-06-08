import { UsersClient } from '@etu/events-proto/dist/discord-bot/users'
import { credentials } from '@grpc/grpc-js'

import { config } from '../../config'

export const usersClient = new UsersClient(
  `${config.rpc.clients.discordBot.host}:${config.rpc.clients.discordBot.port}`,
  credentials.createInsecure()
)
