import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm'
import { DateTime } from 'luxon'
import { FormFieldKind } from '@etu/events-proto/dist/backend/forms'

import { Form } from './form'

import urlJoin from '../lib/url-join'
import { config } from '../config'
import { I18NString } from '../lib/i18n-entity-string'
import { I18NTiptapContent } from '../lib/i18n-entity-tiptap-content'

@Entity({ name: 'template' })
export class Template {
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

  @Column(() => I18NTiptapContent)
  description: I18NTiptapContent

  @Column('int', { array: true })
  fields: FormFieldKind[]

  @Column('smallint', {
    nullable: true,
    default: 0,
  })
  bannerOffset: number

  @Column('smallint', {
    nullable: true,
    default: 25,
  })
  defaultSubmitLimit: number

  get bannerUrl() {
    return urlJoin(
      config.server.publicUrl,
      'v1',
      'static',
      'template-banner',
      this.id,
      DateTime.fromJSDate(this.updatedAt).toUnixInteger().toString()
    )
  }

  @OneToMany(() => Form, (form) => form.template, {
    lazy: true,
  })
  forms: Promise<Form[]> | Form[]
}
