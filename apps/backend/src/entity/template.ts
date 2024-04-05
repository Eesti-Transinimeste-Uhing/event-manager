import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm'
import { Form } from './form'
import { FormFieldKind } from '@etu/events-proto'
import { JSONContent } from '@tiptap/core'

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

  @Column('varchar', {
    length: 32,
    default: '',
  })
  name: string

  @Column('jsonb', {
    nullable: true,
  })
  description: JSONContent

  @Column('int', { array: true })
  fields: FormFieldKind[]

  @Column('smallint', {
    nullable: true,
    default: 0,
  })
  bannerOffset: number

  @OneToMany(() => Form, (form) => form.template, {
    lazy: true,
  })
  forms: Promise<Form[]> | Form[]
}
