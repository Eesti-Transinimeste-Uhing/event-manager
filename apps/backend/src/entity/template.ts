import { randomUUID } from 'node:crypto'
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

  @Column('uuid', {
    nullable: true,
  })
  bannerId: string

  public regenerateBannerId() {
    this.bannerId = randomUUID()

    return this.bannerId
  }

  @Column('varchar', {
    nullable: true,
    default: '',
  })
  description: string

  @Column('int', { array: true })
  fields: FormFieldKind[]
}
