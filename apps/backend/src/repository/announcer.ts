import { AppDataSource } from '../data-source'
import { PaginateAndSortArgs, paginate } from '../lib/pagination'
import { Announcer, AnnouncerType } from '../entity/announcer'
import { Brackets, SelectQueryBuilder } from 'typeorm'

const filterToAnnouncable = (qb: SelectQueryBuilder<Announcer>) => {
  qb.andWhere('announcer.type != :unsetType', { unsetType: AnnouncerType.Unset })
    .leftJoinAndSelect('announcer.options.discord', 'discord')
    .andWhere(
      new Brackets((qb) => {
        /**
         * DISCORD
         * - type = discord
         * - guildId IS NOT NULL
         * - channelId IS NOT NULL
         */
        qb.orWhere(
          new Brackets((qb) => {
            qb.andWhere('announcer.type = :discord', { discord: AnnouncerType.Discord })
            qb.andWhere(
              new Brackets((qb) => {
                qb.andWhere('discord.guildId IS NOT NULL')
                qb.andWhere('discord.channelId IS NOT NULL')
              })
            )
          })
        )
      })
    )
}

export const AnnouncerRepository = AppDataSource.getRepository(Announcer).extend({
  paginate(args: PaginateAndSortArgs) {
    const qb = this.createQueryBuilder('announcer')

    return paginate(args, qb)
  },

  async isAnnouncable(announcerId: string): Promise<boolean> {
    const qb = this.createQueryBuilder('announcer')

    qb.andWhere('announcer.id = :announcerId', { announcerId })

    filterToAnnouncable(qb)

    return (await qb.getCount()) > 0
  },

  async findAnnouncable(): Promise<Announcer[]> {
    const qb = this.createQueryBuilder('announcer')

    filterToAnnouncable(qb)

    return qb.getMany()
  },
})
