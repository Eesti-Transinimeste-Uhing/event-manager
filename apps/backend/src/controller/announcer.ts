import { AppDataSource } from '../data-source'
import { Announcer, AnnouncerOptions, AnnouncerType } from '../entity/announcer'
import { AnnouncerRepository } from '../repository/announcer'

import * as Announce from '../queues/announce'
import { DeepPartial } from 'typeorm'
import { EntityConstructionError, EntityNotFoundError } from '../lib/errors'
import { PaginateAndSortArgs } from '../lib/pagination'
import { AnnouncerOptionsDiscord } from '../entity/announcer-options-discord'
import { AnnouncerOptionsDiscordRepository } from '../repository/announcer-options-discord'

export class AnnouncerController {
  private manager = AppDataSource.createEntityManager()

  private announcers = this.manager.withRepository(AnnouncerRepository)

  private queues = {
    announce: Announce.createQueue(),
  } as const

  public async paginate(args: PaginateAndSortArgs) {
    return await this.announcers.paginate(args)
  }

  public async announce(formId: string) {
    const announcer = this.announcers.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 'asdf',
      name: 'test announcer',
      type: AnnouncerType.Discord,
      options: {
        discord: {
          channelId: '1250913804544376934',
          guildId: '1059811599151550496',
          id: 'qwer',
        },
      },
    })

    await this.queues.announce.add('announce', { formId, optionsId: '' })
  }

  public async getById(id: string) {
    return await this.announcers.findOneBy({ id })
  }

  private optionsDiscord = this.manager.withRepository(AnnouncerOptionsDiscordRepository)

  private getOptionsKey(type: AnnouncerType) {
    switch (type) {
      case AnnouncerType.Discord:
        return 'discord'
      case AnnouncerType.Facebook:
        return 'facebook'
      case AnnouncerType.Instagram:
        return 'instagram'
      default:
        return null
    }
  }

  public async createNew(type: AnnouncerType) {
    return await this.manager.transaction(async (manager) => {
      const options = new AnnouncerOptions()

      switch (type) {
        case AnnouncerType.Discord:
          options.discord = this.optionsDiscord.create({ channelId: '', guildId: '' })
          break
        case AnnouncerType.Facebook:
          break
        case AnnouncerType.Instagram:
          break
        default:
          throw new EntityConstructionError(null, `Invalid announcer type: ${type}`)
      }

      const announcer = this.announcers.create({ type, options })
      await manager.save(announcer)

      return announcer
    })
  }

  public async update(id: string, data: Omit<DeepPartial<Announcer>, 'id'>) {
    const announcer = await this.announcers.findOneBy({ id })

    if (!announcer) {
      throw new EntityNotFoundError(null, `Announcer with ID "${id}" doesn't exist`)
    }

    const optionsKey = this.getOptionsKey(announcer.type)

    if (!optionsKey) {
      throw new EntityConstructionError(null, `Invalid announcer type: ${announcer.type}`)
    }

    await this.manager.transaction(async (manager) => {
      switch (true) {
        case announcer.type === AnnouncerType.Discord && !!data.options?.discord:
          await manager.update(
            AnnouncerOptionsDiscord,
            { id: announcer.options[optionsKey].id },
            data.options.discord
          )
          break
      }

      await manager.update(Announcer, { id }, { ...data, options: undefined })
    })

    return this.announcers.findOneBy({ id })
  }
}
