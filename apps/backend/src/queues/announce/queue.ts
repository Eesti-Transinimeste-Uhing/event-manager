import { Queue } from 'bullmq'
import { config } from '../../config'
import { AnnounceInput, AnnounceOutput } from './types'

export const createQueue = () =>
  new Queue<AnnounceInput, AnnounceOutput, 'announce'>('announce', {
    connection: config.valkey,
  })
