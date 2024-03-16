import { makeSchema, queryField, queryType } from 'nexus'
import path from 'path'

import { User } from './types/user'
import { ViewerQuery } from './queries/viewer'
import { config } from '../config'

export const schema = makeSchema({
  types: [ViewerQuery, User],
  shouldGenerateArtifacts: config.node.env === 'development',
  contextType: {
    module: path.resolve(__dirname, '../server/context.ts'),
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
  prettierConfig:
    config.node.env === 'development'
      ? path.resolve(__dirname, '../../../../.prettierrc')
      : undefined,
})
