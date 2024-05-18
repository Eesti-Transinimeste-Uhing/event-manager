import { enumType, inputObjectType } from 'nexus'
import { SupportedLanguages } from '../../lib/i18n'

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
