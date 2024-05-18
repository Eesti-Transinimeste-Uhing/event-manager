import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { EntityConnection } from 'typeorm-cursor-connection'
import { ConnectionArguments, Connection } from 'graphql-relay'

import { NexusGenInputs } from '../graphql/generated/typegen'
import { addColumnFilter } from './entity-search'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'

export const paginate = <Entity extends ObjectLiteral>(
  args: ConnectionArguments & {
    sort?: Array<NexusGenInputs['PaginationSorting']>
    filter?: Array<NexusGenInputs['PaginationFilter']>
  },
  qb: SelectQueryBuilder<Entity>
): Connection<Entity> => {
  const { sort = [], after, before, first, last, filter = [] } = args
  const columns = qb.connection.getMetadata(qb.alias).columns

  sort.forEach((item, index) => {
    // If the column is a plain column in the db, do nothing
    if (typeof columns[0].entityMetadata.propertiesMap[item.sort] === 'string') {
      return
    }

    // If the column is an embedded i18n object, rewrite the sort to search
    // all languages
    if ('en_GB' in columns[0].entityMetadata.propertiesMap[item.sort]) {
      const i18nSorts: Array<NexusGenInputs['PaginationSorting']> = Object.values(
        columns[0].entityMetadata.propertiesMap[item.sort]
      )
        .map((value) => {
          const column = columns.find((col) => col.propertyPath === value)

          if (!column) {
            return null
          }

          return {
            ...sort[index],
            sort: column.databaseName,
          }
        })
        .filter(Boolean) as Array<NexusGenInputs['PaginationSorting']>

      sort.splice(index, 1, ...i18nSorts)
    }
  })

  if (filter) {
    filter
      .filter((item) => item.column && item.filter)
      .forEach((item) => {
        addColumnFilter(qb, item.column, item.filter, 'DESC')
      })
  }

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
