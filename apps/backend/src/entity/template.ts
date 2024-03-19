import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
