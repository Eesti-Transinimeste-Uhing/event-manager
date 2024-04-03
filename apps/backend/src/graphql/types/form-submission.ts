import { objectType } from 'nexus'
import path from 'node:path'

export const FormSubmissionData = objectType({
  name: 'FormSubmissionData',
  definition(t) {
    t.string('name')
    t.nullable.string('value')
  },
})

export const FormSubmission = objectType({
  name: 'FormSubmission',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/form-submission.ts'),
    export: 'FormSubmission',
  },
  definition(t) {
    t.id('id')
    t.dateTime('createdAt')
    t.field('form', {
      type: 'Form',
    })
    t.list.field('data', {
      type: 'FormSubmissionData',
    })
  },
})
