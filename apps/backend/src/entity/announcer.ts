import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { AnnouncerOptionsDiscord } from './announcer-options-discord'

export enum AnnouncerType {
  Discord = 0,
}

export class AnnouncerOptions {
  @OneToOne(() => AnnouncerOptionsDiscord, (options) => options.announcer, {
    lazy: true,
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  discord: AnnouncerOptionsDiscord | null
}

@Entity({ name: 'announcer' })
export class Announcer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp with time zone',
  })
  deletedAt: Date

  @Column('varchar')
  name: string

  @Column('int')
  type: AnnouncerType

  @Column(() => AnnouncerOptions)
  options: AnnouncerOptions
}
