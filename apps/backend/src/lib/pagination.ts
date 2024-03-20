import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { EntityConnection } from 'typeorm-cursor-connection'
import { ConnectionArguments, Connection } from 'graphql-relay'

import { NexusGenInputs } from '../graphql/generated/typegen'

export const paginate = <Entity extends ObjectLiteral>(
  args: ConnectionArguments & {
    sort?: Array<NexusGenInputs['PaginationSorting']>
    filter?: Array<NexusGenInputs['PaginationFilter']>
  },
  qb: SelectQueryBuilder<Entity>
): Connection<Entity> => {
  const { sort = [], after, before, first, last, filter } = args

  // Sorting preference goes from the beginning of the array, push 'id' to the
  // end, so that when users aren't sorting, we still have a way to get the
  // cursor. The library generates the cursor based on the sort array.
  sort.push({
    order: 'ASC',
    sort: 'id',
  })

  const paginator = new EntityConnection<Entity>({ first, last, after, before }, sort, qb)

  return {
    pageInfo: {
      startCursor: () => paginator.resolveStartCursor(),
      endCursor: () => paginator.resolveEndCursor(),
      hasPreviousPage: () => paginator.resolveHasPreviousPage(),
      hasNextPage: () => paginator.resolveHasNextPage(),
      totalCount: () => qb.getCount(),
    },
    edges: paginator.edges,
  } as unknown as Connection<Entity>
}
