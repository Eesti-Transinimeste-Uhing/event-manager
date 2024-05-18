import { GraphQLScalarType, Kind } from 'graphql'

export const I18nStringResolver = new GraphQLScalarType({
  name: 'I18nString',

  description: 'An object that contains strings for all supported languages',

  serialize(value) {
    return value
  },

  parseValue(value) {
    return value
  },

  parseLiteral(node) {
    if (node.kind === Kind.STRING) {
      return node.value
    }

    return null
  },
})

export const I18nJSONResolver = new GraphQLScalarType({
  name: 'I18nJSON',

  description: 'An object that contains strings for all supported languages',

  serialize(value) {
    return value
  },

  parseValue(value) {
    return value
  },

  parseLiteral(node) {
    if (node.kind === Kind.STRING) {
      return node.value
    }

    return null
  },
})
