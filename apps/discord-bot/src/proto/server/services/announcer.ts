import {
  AnnounceFormRequest,
  AnnounceFormResult,
  UnimplementedAnnouncerService,
} from '@etu/events-proto/generated/discord-bot/announcer'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import VError from 'verror'
import { ActionRowBuilder, ButtonBuilder } from 'discord.js'

import { discord } from '../../../discord/client'
import * as RegisterButton from '../../../components/register-button'

export class AnnouncerService extends UnimplementedAnnouncerService {
  override async announceForm(
    call: ServerUnaryCall<AnnounceFormRequest, AnnounceFormResult>,
    callback: sendUnaryData<AnnounceFormResult>
  ): Promise<void> {
    try {
      const guild = discord.guilds.cache.get(call.request.guildId)

      if (!guild) {
        return callback(new VError('The bot is not a member of the requested guild'), null)
      }

      const channel = guild.channels.cache.get(call.request.channelId)

      if (!channel) {
        return callback(new VError('Target channel not found'), null)
      }

      if (!channel.isTextBased()) {
        return callback(new VError('Target channel is not a text based channel'), null)
      }

      const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new RegisterButton.Component(call.request.formId)
      )

      const message = await channel.send({
        content: call.request.message,
        components: [actionRow],
      })

      callback(
        null,
        AnnounceFormResult.fromObject({ success: message.content === call.request.message })
      )
    } catch (error) {
      if (error instanceof Error) {
        callback(error)
      }
    }
  }
}
