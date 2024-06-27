import { AppDataSource } from '../data-source'
import { AnnouncerOptionsDiscord } from '../entity/announcer-options-discord'

export const AnnouncerOptionsDiscordRepository =
  AppDataSource.getRepository(AnnouncerOptionsDiscord)
