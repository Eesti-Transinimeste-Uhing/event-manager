import { DeepPartial } from 'typeorm'
import { AnnouncerOptionsDiscord } from '../../entity/announcer-options-discord'

export type AnnounceDiscordInput = {
  formId: string
  options: DeepPartial<AnnouncerOptionsDiscord>
}

export type AnnounceDiscordOutput = void
