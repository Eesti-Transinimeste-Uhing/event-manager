import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Announcer } from './announcer'

@Entity({ name: 'announcer_options_discord' })
export class AnnouncerOptionsDiscord {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  guildId: string

  @Column('varchar')
  channelId: string

  @OneToOne(() => Announcer, (announcer) => announcer.options.discord, { lazy: true })
  announcer: Promise<Announcer> | Announcer
}
