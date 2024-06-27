import * as Announce from '../queues/announce'
import * as AnnounceDiscord from '../queues/announce-discord'

export const createQueues = () =>
  ({
    announce: Announce.createQueue(),
    announceDiscord: AnnounceDiscord.createQueue(),
  }) as const

export const createWorkers = () =>
  ({
    announce: Announce.createWorker(),
    announceDiscord: AnnounceDiscord.createWorker(),
  }) as const
