import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm'

import { Form } from './form'

export type FormSubmissionData = Array<{
  name: string
  value: string | number | boolean
}>

@Entity({ name: 'form_submission' })
@Unique('UQ_DUPLICATE_SUBMISSION', ['sourceHash', 'form'])
export class FormSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date

  @ManyToOne(() => Form, (form) => form.submissions, {
    lazy: true,
  })
  form: Promise<Form> | Form

  @Column('jsonb')
  data: FormSubmissionData

  @Column('varchar')
  sourceHash: string
}
