import { objectType } from 'nexus'
import path from 'node:path'

export const User = objectType({
  name: 'User',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/user.ts'),
    export: 'User',
  },
  definition(t) {
    t.id('id')
  },
})
