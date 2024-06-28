import { enumType, objectType } from 'nexus'
import { FormSubmittabilityTag } from '../../controller/form'

export const FormSubmittabilityTagEnum = enumType({
  name: 'FormSubmittabilityTag',
  members: FormSubmittabilityTag,
})

export const FormSubmittability = objectType({
  name: 'FormSubmittability',
  definition(t) {
    t.boolean('submittable')
    t.list.field('tags', {
      type: 'FormSubmittabilityTag',
    })
  },
})
