import { AnnounceFormRequest } from '@etu/events-proto/dist/discord-bot/announcer'
import { Worker } from 'bullmq'
import VError from 'verror'
import { SupportedLanguages } from '@etu/events-proto/dist/lib'
import { RenderTarget } from '@etu/tiptap'

import { announcerClient as client } from '../../proto/clients/discord-bot'
import { AnnounceInput, AnnounceOutput } from './types'
import { announcerController, formController, queues } from '../../server/static-context'
import { config } from '../../config'
import { log } from '../../log'
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
