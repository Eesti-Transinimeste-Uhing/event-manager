import { AnnounceFormRequest } from '@etu/events-proto/dist/discord-bot/announcer'
import { Worker } from 'bullmq'
import VError from 'verror'
import { SupportedLanguages } from '@etu/events-proto/dist/lib'
import { RenderTarget } from '@etu/tiptap'
import { IterableSupportedLanguages } from '@etu/i18n'

import { announcerClient as client } from '../../proto/clients/discord-bot'
import { AnnounceDiscordInput, AnnounceDiscordOutput } from './types'
import { formController } from '../../server/static-context'
import { config } from '../../config'
import { log } from '../../log'

export const createWorker = () =>
  new Worker<AnnounceDiscordInput, AnnounceDiscordOutput, 'announce-discord'>(
    'announce-discord',
    async (job) => {
      log.debug('new announce job picked up!')

      const form = await formController.getById(job.data.formId)

      if (!form) {
        throw new VError('Form not found')
      }

      const discordMessage = await formController.renderDescription(
        form,
        IterableSupportedLanguages,
        RenderTarget.Discord
      )

      await client.announceForm(
        AnnounceFormRequest.fromObject({
          message: discordMessage,
          channelId: job.data.options.channelId,
          guildId: job.data.options.guildId,
        })
      )
    },
    {
      connection: config.valkey,
    }
  )
