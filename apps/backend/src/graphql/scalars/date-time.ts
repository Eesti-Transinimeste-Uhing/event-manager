import { DateTime } from 'luxon'

import { GraphQLScalarType, Kind } from 'graphql'

export const DateTimeResolver = new GraphQLScalarType({
  name: 'DateTime',

  description: 'A DateTime value consumable with Luxon',

  serialize(value) {
    if (value instanceof Date) {
      return DateTime.fromJSDate(value, { zone: 'utc' }).toISO()
    }

    throw Error('GraphQL DateTime Scalar serializer expected a `Date` object')
  },

  parseValue(value) {
    if (typeof value === 'string') {
      return DateTime.fromISO(value, { zone: 'utc' }).toJSDate()
    }

    throw new Error('GraphQL DateDime Scalar parser expected a `number`')
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return DateTime.fromMillis(Number.parseInt(ast.value, 10), { zone: 'utc' }).toJSDate()
    }

    if (ast.kind === Kind.STRING) {
      return DateTime.fromISO(ast.value, { zone: 'utc' }).toJSDate()
    }

    return null
  },
})
