import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'
import { EntityConnection, EntityConnectionSortOption } from 'typeorm-cursor-connection'
import { Connection } from 'graphql-relay'

import { NexusGenInputs } from '../graphql/generated/typegen'
import { PaginationArgs } from 'nexus/dist/plugins/connectionPlugin'

const mapI18nColumns = (input: string[], columns: ColumnMetadata[]) => {
  const result: string[] = []

  input.forEach((item, index) => {
    // If the column is a plain column in the db, do nothing
    if (typeof columns[0].entityMetadata.propertiesMap[item] === 'string') {
      result.push(item)
      return
    }

    // If the column is an embedded i18n object, rewrite the sort to search
    // all languages
    if (
      columns[0].entityMetadata.propertiesMap[item] &&
      'en_GB' in columns[0].entityMetadata.propertiesMap[item]
    ) {
      const expandedItems = Object.values(columns[0].entityMetadata.propertiesMap[item])
        .map((value) => {
          const column = columns.find((col) => col.propertyPath === value)

          if (!column) return null

          return column.databaseName
        })
        .filter(Boolean) as string[]

      result.push(...expandedItems)
      return
    }

    result.push(item)
  })

  return result
}

export type PaginateAndSortArgs = PaginationArgs & {
  sort: {
    order: 'ASC' | 'DESC'
    columns: string[]
  }
  filter: {
    query: string
    columns: string[]
  }
}

export const paginate = <Entity extends ObjectLiteral>(
  args: PaginateAndSortArgs,
  qb: SelectQueryBuilder<Entity>
): Connection<Entity> => {
  const { sort, after, before, first, last, filter } = args
  const columns = qb.connection.getMetadata(qb.alias).columns

  const sortableColumns = mapI18nColumns(sort.columns, columns)

  const realSort: EntityConnectionSortOption[] = sortableColumns.map((columnName) => ({
    order: sort[0] ? sort[0].order : 'DESC',
    sort: columnName,
  }))

  const filterableColumns = mapI18nColumns(filter.columns, columns)

  const realFilter: Array<NexusGenInputs['PaginationFilter']> = filterableColumns.map(
    (columnName) => ({
      columns: [columnName],
      query: filter[0] ? filter[0].filter : '',
    })
  )

  realFilter.forEach((item) => {
    item.columns.forEach((column) => {
      const escapedColumn = qb.escape(column)

      return qb.orWhere(`"${qb.alias}".${escapedColumn} ILIKE '%' || :query || '%'`, {
        query: item.query,
      })
    })
  })

  // Sorting preference goes from the beginning of the array, push 'id' to the
  // end, so that when users aren't sorting, we still have a way to get the
  // cursor. The library generates the cursor based on the sort array.
  realSort.push({
    order: 'ASC',
    sort: 'id',
  })

  const paginator = new EntityConnection<Entity>({ first, last, after, before }, realSort, qb)

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
