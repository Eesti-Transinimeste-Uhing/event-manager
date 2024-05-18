import { SupportedLanguages } from './i18n'
import {
  NexusInputFieldConfig,
  NexusOutputFieldConfig,
  inputObjectType,
  objectType,
} from 'nexus/dist/core'

export const i18nType = (name: string, config: NexusOutputFieldConfig<string, string>) => {
  return objectType({
    name,
    definition(t) {
      for (const lang in SupportedLanguages) {
        t.field(lang, config)
      }
    },
  })
}

export const i18nInputType = (name: string, config: NexusInputFieldConfig<string, string>) => {
  return inputObjectType({
    name,
    definition(t) {
      for (const lang in SupportedLanguages) {
        t.field(lang, config)
      }
    },
  })
}
