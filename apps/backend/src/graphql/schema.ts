import { makeSchema, connectionPlugin, declarativeWrappingPlugin } from 'nexus'
import path from 'path'

import { config } from '../config'

import * as Scalars from './scalars'
import * as Types from './types'
import * as Queries from './queries'
import * as Mutations from './mutations'
import * as Subscriptions from './subscriptions'

export const schema = makeSchema({
  types: [
    ...Object.values(Scalars),
    ...Object.values(Types),
    ...Object.values(Queries),
    ...Object.values(Mutations),
    ...Object.values(Subscriptions),
  ],
  shouldGenerateArtifacts: config.node.env === 'development',
  contextType: {
    module: path.resolve(__dirname, '../server/dynamic-context.ts'),
    export: 'DynamicContext',
  },
  outputs: {
    schema: path.resolve(__dirname, 'generated/schema.graphql'),
    typegen: path.resolve(__dirname, 'generated/typegen.ts'),
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
  plugins: [
    declarativeWrappingPlugin(),
    connectionPlugin({
      additionalArgs: {
        sort: Types.PaginationSorting.asArg({ required: true }),
        filter: Types.PaginationFilter.asArg({ required: true }),
      },
    }),
  ],
  prettierConfig:
    config.node.env === 'development'
      ? path.resolve(__dirname, '../../../../.prettierrc')
      : undefined,
})
