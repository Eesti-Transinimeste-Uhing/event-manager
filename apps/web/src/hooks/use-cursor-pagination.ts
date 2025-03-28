import { ComputedRef, computed, ref } from 'vue'
import { TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@vue/apollo-composable'

import {
  InputMaybe,
  PaginationFilter,
  PaginationSorting,
  PaginationSortingOrder,
} from 'src/graphql/generated/graphql'
import { useNotificationsStore } from 'src/stores/notifications'

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
  filter?: InputMaybe<PaginationFilter>
  sort?: InputMaybe<PaginationSorting>
}

type Options<ExtraVariables> = {
  defaultSortColumns: string[]
  defaultFilterColumns: string[]
  extraVariables?: ComputedRef<Omit<ExtraVariables, keyof QueryVariables>>
}

export const useCursorPagination = <
  ResponseKey extends string,
  Query extends ResultWithPageInfo<ResponseKey>,
  ExtraVariables,
>(
  responseKey: ResponseKey,
  documentNode: TypedDocumentNode<Query, QueryVariables & ExtraVariables>,
  options: Options<ExtraVariables>
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

  const sort = computed<PaginationSorting>(() => ({
    order: sortDir.value,
    columns: sortColumns.value,
  }))

  const filter = computed<PaginationFilter>(() => ({
    columns: filterColumns.value,
    query: filterText.value,
  }))

  const variables = computed<QueryVariables & ExtraVariables>(() => {
    return {
      first: first.value,
      last: last.value,
      after: afterCursor.value,
      before: beforeCursor.value,
      filter: filter.value,
      sort: sort.value,
      ...(options.extraVariables?.value as ExtraVariables),
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
    try {
      await query.refetch()

      notifications.enqueue({
        lines: ['Refreshed!'],
        type: 'success',
      })
    } catch (error) {
      if (error instanceof Error) {
        notifications.enqueue({
          type: 'error',
          lines: ['Could not refresh', error.message],
        })
      }
    }
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
