import { subscriptionField } from 'nexus'

import { pubsub } from '../../pubsub'

export const TestSubscription = subscriptionField('test', {
  type: 'String',
  subscribe(root, args, context) {
    console.log(context)

    return pubsub.asyncIterator(['TEST_CLOCK'])
  },
  resolve(payload: { time: number }) {
    return String(payload.time)
  },
})
