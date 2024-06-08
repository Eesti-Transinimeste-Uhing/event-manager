import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Template } from './template'
import { FormSubmission } from './form-submission'
import urlJoin from '../lib/url-join'
import { config } from '../config'
import { DateTime } from 'luxon'
import { I18NString } from '../lib/i18n-entity-string'

@Entity({ name: 'form' })
export class Form {
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

  @Column(() => I18NString)
  name: I18NString

  @Column(() => I18NString)
  location: I18NString

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  startsAt: Date

  @Column({
    type: 'smallint',
    nullable: false,
  })
  submitLimit: number

  get bannerUrl() {
    return urlJoin(
      config.server.publicUrl,
      'v1',
      'static',
      'form-banner',
      this.id,
      DateTime.fromJSDate(this.updatedAt).toUnixInteger().toString()
    )
  }

  @ManyToOne(() => Template, (template) => template.forms, {
    lazy: true,
  })
  template: Promise<Template> | Template

  @OneToMany(() => FormSubmission, (submission) => submission.form, {
    lazy: true,
  })
  submissions: Promise<FormSubmission[]> | FormSubmission[]
}
