import { Queue } from 'bullmq'
import { config } from '../../config'
import { AnnounceDiscordInput, AnnounceDiscordOutput } from './types'

export const createQueue = () =>
  new Queue<AnnounceDiscordInput, AnnounceDiscordOutput, 'announce-discord'>('announce-discord', {
    connection: config.valkey,
  })
