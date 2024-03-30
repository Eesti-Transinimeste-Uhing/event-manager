import { TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@vue/apollo-composable'
import {
  InputMaybe,
  PaginationFilter,
  PaginationSorting,
  PaginationSortingOrder,
} from 'src/graphql/generated/graphql'
import { useNotificationsStore } from 'src/stores/notifications'
import { computed, ref } from 'vue'
import { useIsServer } from './is-server'

const PAGE_SIZE = 30

type ResultWithPageInfo<ResponseKey extends string> = {
  [key in ResponseKey]: {
    pageInfo: {
      __typename?: 'PageInfo'
      totalCount?: number | null
      hasNextPage?: boolean | null
      hasPreviousPage?: boolean | null
      endCursor?: string | null
      startCursor?: string | null
    }
  }
}

type QueryVariables = {
  first?: InputMaybe<number>
  last?: InputMaybe<number>
  after?: InputMaybe<string>
  before?: InputMaybe<string>
  filter?: InputMaybe<PaginationFilter[]>
  sort?: InputMaybe<PaginationSorting[]>
}

type Options = {
  defaultSortColumns: string[]
  defaultFilterColumns: string[]
}

export const useCursorPagination = <
  ResponseKey extends string,
  Query extends ResultWithPageInfo<ResponseKey>,
>(
  responseKey: ResponseKey,
  documentNode: TypedDocumentNode<Query, QueryVariables>,
  options: Options
) => {
  const { isServer } = useIsServer()

  const first = ref<number | null>(PAGE_SIZE)
  const last = ref<number | null>(null)
  const afterCursor = ref<string | null>(null)
  const beforeCursor = ref<string | null>(null)

  const sortDir = ref<PaginationSortingOrder>(PaginationSortingOrder.Desc)
  const sortColumns = ref<string[]>(options.defaultSortColumns)
  const filterColumns = ref<string[]>(options.defaultFilterColumns)
  const filterText = ref('')

  const sort = computed<PaginationSorting[]>(() =>
    sortColumns.value.map((sortColumn) => ({
      order: sortDir.value,
      sort: sortColumn,
    }))
  )

  const filter = computed<PaginationFilter[]>(() =>
    filterColumns.value.map((filterColumn) => ({
      column: filterColumn,
      filter: filterText.value,
    }))
  )

  const variables = computed<QueryVariables>(() => {
    return {
      first: first.value,
      last: last.value,
      after: afterCursor.value,
      before: beforeCursor.value,
      filter: filter.value,
      sort: sort.value,
    }
  })

  const query = useQuery(documentNode, variables, {
    prefetch: false,
    fetchPolicy: 'no-cache',
  })

  const nextPage = () => {
    last.value = null
    beforeCursor.value = null
    first.value = PAGE_SIZE
    afterCursor.value = query.result.value?.[responseKey].pageInfo.endCursor ?? null
  }

  const previousPage = () => {
    first.value = null
    afterCursor.value = null
    last.value = PAGE_SIZE
    beforeCursor.value = query.result.value?.[responseKey].pageInfo.startCursor ?? null
  }

  const pagination = ref({
    rowsPerPage: 1000,
  })

  const pageInfo = computed(
    () =>
      query.result.value?.[responseKey].pageInfo ?? {
        __typename: 'PageInfo',
        endCursor: null,
        startCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: null,
      }
  )

  const toggleSortDir = () => {
    afterCursor.value = null
    beforeCursor.value = null

    sortDir.value =
      sortDir.value === PaginationSortingOrder.Asc
        ? PaginationSortingOrder.Desc
        : PaginationSortingOrder.Asc
  }

  const notifications = useNotificationsStore()

  const handleRefetch = async () => {
    await query.refetch()

    notifications.enqueue({
      lines: ['Refreshed!'],
      type: 'success',
    })
  }

  return {
    pagination,
    nextPage,
    previousPage,
    pageInfo,
    toggleSortDir,
    filterColumns,
    filterText,
    sortDir,
    sortColumns,
    loading: computed(() => isServer.value || query.loading.value),
    error: query.error,
    result: query.result,
    refetch: handleRefetch,
  }
}
