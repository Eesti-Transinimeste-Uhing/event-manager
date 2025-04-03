import { SupportedLanguages } from '@etu/events-proto/generated/lib'
import {
  NexusInputFieldConfig,
  NexusOutputFieldConfig,
  inputObjectType,
  objectType,
} from 'nexus/dist/core'

const supportedLanguages = Object.values(SupportedLanguages).filter((lang) =>
  Number.isNaN(Number.parseInt(lang as string, 10))
) as string[]

export const i18nType = (name: string, config: NexusOutputFieldConfig<string, string>) => {
  return objectType({
    name,
    definition(t) {
      for (const lang of supportedLanguages) {
        t.field(lang, config)
      }
    },
  })
}

export const i18nInputType = (name: string, config: NexusInputFieldConfig<string, string>) => {
  return inputObjectType({
    name,
    definition(t) {
      for (const lang of supportedLanguages) {
        t.field(lang, config)
      }
    },
  })
}
