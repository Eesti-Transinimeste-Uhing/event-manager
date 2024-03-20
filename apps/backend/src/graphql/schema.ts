import { makeSchema, connectionPlugin } from 'nexus'
import path from 'path'

import { config } from '../config'

import * as Scalars from './scalars'
import * as Types from './types'
import * as Queries from './queries'
import * as Mutations from './mutations'

export const schema = makeSchema({
  types: [
    ...Object.values(Scalars),
    ...Object.values(Types),
    ...Object.values(Queries),
    ...Object.values(Mutations),
  ],
  shouldGenerateArtifacts: config.node.env === 'development',
  contextType: {
    module: path.resolve(__dirname, 'context.ts'),
    export: 'GraphqlContext',
  },
  outputs: {
    schema: path.resolve(__dirname, 'generated/schema.graphql'),
    typegen: path.resolve(__dirname, 'generated/typegen.ts'),
  },
  nonNullDefaults: {
    input: true,
    output: false,
  },
  plugins: [connectionPlugin()],
  prettierConfig:
    config.node.env === 'development'
      ? path.resolve(__dirname, '../../../../.prettierrc')
      : undefined,
})
