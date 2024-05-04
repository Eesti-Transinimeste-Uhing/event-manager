import { i18nInputType, i18nType } from '../../lib/i18n-graphql-schema'

export const I18nJSON = i18nType('I18nJSON', {
  type: 'JSONObject',
})

export const I18nJSONInput = i18nInputType('I18nJSONInput', {
  type: 'JSONObject',
})
