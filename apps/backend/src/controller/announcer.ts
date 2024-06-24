import { AppDataSource } from '../data-source'
import { Announcer, AnnouncerType } from '../entity/announcer'
import { AnnouncerRepository } from '../repository/announcer'

import * as Announce from '../queues/announce'
import { DeepPartial } from 'typeorm'
import { EntityNotFoundError } from '../lib/errors'
import { PaginateAndSortArgs } from '../lib/pagination'

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

  public async createNew() {
    const announcer = this.announcers.create({})

    await this.manager.transaction(async (manager) => {
      await manager.save(announcer)
    })

    return announcer
  }

  public async update(id: string, data: Omit<DeepPartial<Announcer>, 'id'>) {
    if (!(await this.announcers.existsBy({ id }))) {
      throw new EntityNotFoundError(null, `Announcer with ID "${id}" doesn't exist`)
    }

    await this.manager.transaction(async (manager) => {
      await manager.update(Announcer, { id }, data)
    })

    return this.announcers.findOneBy({ id })
  }
}
