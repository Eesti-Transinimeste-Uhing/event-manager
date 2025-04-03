import { SupportedLanguages } from '@etu/events-proto/generated/lib'
import { enumType, inputObjectType } from 'nexus'

export const SupportedLanguagesEnum = enumType({
  name: 'SupportedLanguages',
  members: SupportedLanguages,
})

export const WhereLangInput = inputObjectType({
  name: 'WhereLangInput',
  definition(t) {
    t.field('language', {
      type: 'SupportedLanguages',
    })
  },
})
