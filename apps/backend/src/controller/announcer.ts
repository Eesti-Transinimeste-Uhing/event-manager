import { AppDataSource } from '../data-source'
import { AnnouncerType } from '../entity/announcer'
import { AnnouncerRepository } from '../repository/announcer'

import * as Announce from '../queues/announce'

export class AnnouncerController {
  private manager = AppDataSource.createEntityManager()

  private announcers = this.manager.withRepository(AnnouncerRepository)

  private queues = {
    announce: Announce.createQueue(),
  } as const

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
}
