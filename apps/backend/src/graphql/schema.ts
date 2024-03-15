import { makeSchema, queryField, queryType } from 'nexus'

const testQuery = queryField((t) => {
  t.string('test', {
    resolve() {
      return String(Date.now())
    },
  })
})

export const schema = makeSchema({
  types: [testQuery],
})
