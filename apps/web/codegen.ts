import path from 'path'
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: path.resolve(__dirname, '../backend/src/graphql/generated/schema.graphql'),
  documents: ['src/**/*.vue', 'src/**/*.ts'],
  ignoreNoDocuments: true,
  hooks: {
    afterOneFileWrite: ['prettier -w'],
  },
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        scalars: {
          I18nString: {
            input: 'Record<SupportedLanguages, string>',
            output: 'Record<SupportedLanguages, string>',
          },
          I18nStringJson: {
            input: 'Record<SupportedLanguages, any>',
            output: 'Record<SupportedLanguages, any>',
          },
        },
      },
    },
  },
}

export default config
