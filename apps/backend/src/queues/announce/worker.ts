import { AnnounceFormRequest } from '@etu/events-proto/dist/discord-bot/announcer'
import { Worker } from 'bullmq'
import VError from 'verror'
import { SupportedLanguages } from '@etu/events-proto/dist/lib'
import { RenderTarget } from '@etu/tiptap'

import { announcerClient as client } from '../../proto/clients/discord-bot'
import { AnnounceInput, AnnounceOutput } from './types'
import { formController } from '../../server/static-context'
import { config } from '../../config'
import { log } from '../../log'

export const createWorker = () =>
  new Worker<AnnounceInput, AnnounceOutput, 'announce'>(
    'announce',
    async (job) => {
      log.debug('new announce job picked up!')

      const form = await formController.getById(job.data.formId)

      if (!form) {
        throw new VError('Form not found')
      }

      const discordMessage = await formController.renderDescription(
        form,
        [SupportedLanguages.en_GB],
        RenderTarget.Discord
      )

      console.log(discordMessage)

      // log.debug(`rendered: "${discordMessage}"`)

      // await client.announceForm(
      //   AnnounceFormRequest.fromObject({
      //     message: discordMessage,
      //     channelId: '1250913804544376934',
      //     guildId: '1059811599151550496',
      //   })
      // )

      // log.debug('sent')
    },
    {
      connection: config.valkey,
    }
  )
