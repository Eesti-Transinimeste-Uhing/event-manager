import { i18nInputType } from '../../lib/i18n-graphql-schema'

export const I18nJSONInput = i18nInputType('I18nJSONInput', {
  type: 'JSONObject',
  nullable: true,
})
