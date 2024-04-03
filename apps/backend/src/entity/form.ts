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

  @Column('varchar', {
    nullable: true,
  })
  name: string

  @ManyToOne(() => Template, (template) => template.forms, {
    lazy: true,
  })
  template: Promise<Template> | Template

  @OneToMany(() => FormSubmission, (submission) => submission.form, {
    lazy: true,
  })
  submissions: Promise<FormSubmission[]> | FormSubmission[]
}
