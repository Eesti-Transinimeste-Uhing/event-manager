import { enumType, inputObjectType, objectType } from 'nexus'

// Override PageInfo to make "hasNextPage" and "hasPreviousPage" nullable
export const PageInfo = objectType({
  name: 'PageInfo',
  description:
    'PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo',
  definition(t) {
    t.nullable.field('hasNextPage', {
      type: 'Boolean',
      description:
        'Used to indicate whether more edges exist following the set defined by the clients arguments.',
    })
    t.nullable.field('hasPreviousPage', {
      type: 'Boolean',
      description:
        'Used to indicate whether more edges exist prior to the set defined by the clients arguments.',
    })
    t.nullable.field('startCursor', {
      type: 'String',
      description:
        'The cursor corresponding to the first nodes in edges. Null if the connection is empty.',
    })
    t.nullable.field('endCursor', {
      type: 'String',
      description:
        'The cursor corresponding to the last nodes in edges. Null if the connection is empty.',
    })
    t.nullable.int('totalCount', {
      description: 'The total amount of items in the repository after filters are applied',
    })
  },
})

export const PaginationSortingOrder = enumType({
  name: 'PaginationSortingOrder',
  members: {
    Asc: 'ASC',
    Desc: 'DESC',
  },
})

export const PaginationSorting = inputObjectType({
  name: 'PaginationSorting',
  definition(t) {
    t.string('sort')
    t.field('order', {
      type: PaginationSortingOrder,
    })
  },
})

export const PaginationFilter = inputObjectType({
  name: 'PaginationFilter',
  definition(t) {
    t.string('column')
    t.string('filter')
  },
})
