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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

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
