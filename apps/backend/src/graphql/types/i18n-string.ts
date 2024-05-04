import { i18nInputType, i18nType } from '../../lib/i18n-graphql-schema'

export const I18nString = i18nType('I18nString', {
  type: 'String',
})

export const I18nStringInput = i18nInputType('I18nStringInput', {
  type: 'String',
})
