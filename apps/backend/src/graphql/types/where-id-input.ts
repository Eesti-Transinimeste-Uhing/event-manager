import { inputObjectType } from 'nexus'

export const WhereIdInput = inputObjectType({
  name: 'WhereIdInput',
  definition(t) {
    t.id('id')
  },
})
