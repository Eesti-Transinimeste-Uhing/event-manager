import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Form } from './form'

export enum FormFieldKind {
  PreferredName,
  Email,
  Age,
  Gender,
  ConfirmEvent,
}

@Entity()
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

  @Column('varchar', {
    length: 32,
    default: '',
  })
  name: string

  @Column('varchar', {
    nullable: true,
    default: '',
  })
  description: string

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
