import { UsersClient } from '@etu/events-proto/dist/discord-bot/users'
import { AnnouncerClient } from '@etu/events-proto/dist/discord-bot/announcer'
import { credentials } from '@grpc/grpc-js'

import { config } from '../../config'

export const usersClient = new UsersClient(
  `${config.rpc.clients.discordBot.host}:${config.rpc.clients.discordBot.port}`,
  credentials.createInsecure()
)

export const announcerClient = new AnnouncerClient(
  `${config.rpc.clients.discordBot.host}:${config.rpc.clients.discordBot.port}`,
  credentials.createInsecure()
)
