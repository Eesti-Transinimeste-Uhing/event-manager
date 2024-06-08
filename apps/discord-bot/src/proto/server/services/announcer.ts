import {
  AnnounceFormRequest,
  AnnounceFormResult,
  UnimplementedAnnouncerService,
} from '@etu/events-proto/dist/discord-bot/announcer'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import VError from 'verror'
import { TextChannel } from 'discord.js'

import { discord } from '../../../discord/client'

export class AnnouncerService extends UnimplementedAnnouncerService {
  override async announceForm(
    call: ServerUnaryCall<AnnounceFormRequest, AnnounceFormResult>,
    callback: sendUnaryData<AnnounceFormResult>
  ): Promise<void> {
    try {
      const channel = discord.guild.channels.cache.get(call.request.channelId)

      if (!channel) {
        return callback(new VError('Announcement channel not found'), null)
      }

      if (!(channel instanceof TextChannel)) {
        return callback(new VError('Announcement channel is not a text channel'), null)
      }

      await channel.send({ content: call.request.message })

      callback(null, AnnounceFormResult.fromObject({ success: true }))
    } catch (error) {
      if (error instanceof Error) {
        callback(error)
      }
    }
  }
}
