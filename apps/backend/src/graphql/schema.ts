import { makeSchema, queryField, queryType } from 'nexus'
import path from 'path'

import { DiscordCallbackMutation } from './mutations/discord-callback'
import { User } from './types/user'
import { CheckDiscordTokenQuery } from './queries/checkDiscordToken'
import { config } from '../config'

export const schema = makeSchema({
  types: [DiscordCallbackMutation, CheckDiscordTokenQuery, User],
  shouldGenerateArtifacts: config.node.env === 'development',
  outputs: {
    schema: path.resolve(__dirname, 'generated/schema.graphql'),
    typegen: path.resolve(__dirname, 'generated/typegen.ts'),
  },
  prettierConfig:
    config.node.env === 'development'
      ? path.resolve(__dirname, '../../../../.prettierrc')
      : undefined,
})
