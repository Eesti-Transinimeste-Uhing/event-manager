import { enumType, inputObjectType } from 'nexus'
import { SupportedLanguages } from '../../lib/i18n'

export const Lang = enumType({
  name: 'Lang',
  members: SupportedLanguages,
})

export const WhereLangInput = inputObjectType({
  name: 'WhereLangInput',
  definition(t) {
    t.field('lang', {
      type: 'Lang',
    })
  },
})
