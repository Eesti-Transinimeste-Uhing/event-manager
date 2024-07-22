import { Worker } from 'bullmq'

import { AnnounceInput, AnnounceOutput } from './types'
import { announcerController, formController, queues } from '../../server/static-context'
import { config } from '../../config'
import { AnnouncerType } from '../../entity/announcer'

export const createWorker = () =>
  new Worker<AnnounceInput, AnnounceOutput, 'announce'>(
    'announce',
    async (job) => {
      const announcers = await announcerController.listAnnouncable()

      for (const announcer of announcers) {
        switch (announcer.type) {
          case AnnouncerType.Discord: {
            if (!announcer.options.discord) continue

            await queues.announceDiscord.add('announce-discord', {
              formId: job.data.formId,
              options: announcer.options.discord,
            })
            continue
          }
        }
      }
    },
    {
      connection: config.valkey,
    }
  )
