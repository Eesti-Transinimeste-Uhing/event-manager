import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('varchar', {
    nullable: true,
    default: '',
    length: 2_083,
  })
  bannerPath: string

  @Column('varchar', {
    nullable: true,
    default: '',
  })
  description: string

  @Column('int', { array: true })
  fields: FormFieldKind[]
}
