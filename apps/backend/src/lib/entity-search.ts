import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export const addColumnFilter = <Entity extends ObjectLiteral>(
  qb: SelectQueryBuilder<Entity>,
  column: string,
  query: string,
  orderDirection: 'ASC' | 'DESC'
) => {
  const escapedColumn = qb.escape(column)

  return qb
    .orWhere(`"${qb.alias}".${escapedColumn} ILIKE '%' || :query || '%'`, { query })
    .addOrderBy(`LEVENSHTEIN("${qb.alias}".${escapedColumn}, :query))`, orderDirection)
}
