import path from 'path'
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: path.resolve(__dirname, '../backend/src/graphql/generated/schema.graphql'),
  documents: ['src/**/*.vue'],
  ignoreNoDocuments: true,
  hooks: {
    afterOneFileWrite: ['prettier -w'],
  },
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
}

export default config
