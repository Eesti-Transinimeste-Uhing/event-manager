import { objectType } from 'nexus'

export const BullJob = objectType({
  name: 'BullJob',
  sourceType: {
    module: 'bullmq',
    export: 'Job',
  },
  definition(t) {
    t.string('id', {
      resolve: (root) => root.id || '',
    })
    t.string('name')
    t.string('progress')
    t.int('attemptsMade')
    t.nullable.dateTime('finishedOn', {
      resolve: (root) => (root.finishedOn ? new Date(root.finishedOn) : null),
    })
    t.nullable.dateTime('processedOn', {
      resolve: (root) => (root.processedOn ? new Date(root.processedOn) : null),
    })
    t.dateTime('timestamp', {
      resolve: (root) => new Date(root.timestamp),
    })
    t.int('delay')
  },
})
