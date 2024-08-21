import { rule } from 'graphql-shield'
import { Rule } from 'graphql-shield/typings/rules'

import { Flag, flags } from '../../lib/flags'

const cache = new Map<string, Rule>()

export const hasFlag = (flag: Flag) => {
  if (!cache.has(flag)) {
    cache.set(flag, rule({ cache: 'no_cache' })(async (parent, args, ctx, info) => {
      return flags.getFlag(flag).enabled || `Flag "${flag}" is not enabled`
    }))
  }

  return cache.get(flag)!
}
