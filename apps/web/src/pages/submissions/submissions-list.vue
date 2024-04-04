<script lang="ts" setup>
import { QTableColumn } from 'quasar'

import { graphql } from 'src/graphql/generated'
import { PaginationSortingOrder } from 'src/graphql/generated/graphql'
import EmptyContent from 'src/components/empty-content.vue'
import { useCursorPagination } from 'src/hooks/use-cursor-pagination'
import DateTime from 'src/components/date-time.vue'
import TooltipButton from 'src/components/tooltip-button.vue'
import TableSkeleton from 'components/skeletons/table-skeleton.vue'
import { FormSubmissionListQuery } from 'src/graphql/generated/graphql'
import { computed } from 'vue'

const {
  loading,
  result,
  error,
  pagination,
  pageInfo,
  nextPage,
  previousPage,
  sortDir,
  toggleSortDir,
  refetch,
} = useCursorPagination(
  'formSubmissions',
  graphql(`
    query FormSubmissionList(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $filter: [PaginationFilter!]
      $sort: [PaginationSorting!]
    ) {
      formSubmissions(
        first: $first
        last: $last
        after: $after
        before: $before
        filter: $filter
        sort: $sort
      ) {
        pageInfo {
          totalCount
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          node {
            id
            createdAt
            form {
              id
              name
              template {
                id
                name
              }
            }
            data {
              name
              value
            }
          }
        }
      }
    }
  `),
  {
    defaultFilterColumns: [],
    defaultSortColumns: ['createdAt'],
  }
)

type Column = QTableColumn<FormSubmissionListQuery['formSubmissions']['edges'][0]>

const columns = computed<Column[]>(() => {
  const dynamicColumns: Column[] = []

  for (const edge of result.value?.formSubmissions.edges ?? []) {
    for (const item of edge.node.data) {
      if (dynamicColumns.some((column) => column.name === item.name)) {
        continue
      }

      const column: Column = {
        name: item.name,
        label: item.name,
        align: 'left',
        field(row) {
          return row.node.data.find(
            (data) => String(data.name).toLowerCase() === String(item.name).toLowerCase()
          )?.value
        },
      }

      dynamicColumns.push(column)
    }
  }

  return [
    {
      name: 'form',
      label: 'Form',
      align: 'left',
      style: 'width: 250px;',
      field(row) {
        return row.node.form.name
      },
    },
    {
      name: 'template',
      label: 'Template',
      align: 'left',
      style: 'width: 250px;',
      field(row) {
        return row.node.form.template.name
      },
    },
    ...dynamicColumns,
    {
      name: 'createdAt',
      label: 'Created',
      align: 'left',
      style: 'width: 150px;',
      field(row) {
        return row.node.createdAt
      },
    },
  ]
})

const handleRowClick = () => {
  return null
}
</script>

<style lang="scss" scoped>
.forms-list {
  height: calc(100vh - 130px);
}
</style>

<template>
  <div class="forms-list column justify-between">
    <q-banner inline-actions rounded class="q-mb-md q-py-none">
      <template v-slot:action>
        <tooltip-button
          color="secondary"
          flat
          round
          :icon="
            sortDir === PaginationSortingOrder.Desc
              ? 'las la-sort-amount-down'
              : 'las la-sort-amount-up'
          "
          tooltip="Sort"
          :loading="loading"
          @click="toggleSortDir"
        />

        <tooltip-button
          color="secondary"
          flat
          round
          icon="las la-sync"
          tooltip="Refresh"
          :loading="loading"
          @click="refetch"
        />
      </template>
    </q-banner>

    <table-skeleton v-if="loading && !result" class="col" />

    <empty-content
      v-else-if="error"
      :content="error.message"
      title="Network error"
      icon="las la-times"
      icon-colour="red"
    />

    <div class="col" v-else-if="result">
      <q-table
        flat
        class="fit"
        :rows="result.formSubmissions.edges"
        :columns="columns"
        row-key="index"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        hide-bottom
        @row-click="handleRowClick"
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <span class="text-weight-bolder">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>

        <template #body-cell-createdAt="props">
          <q-td :props="props">
            <date-time :model-value="props.value" />
          </q-td>
        </template>

        <template #body-cell-updatedAt="props">
          <q-td :props="props">
            <date-time :model-value="props.value" />
          </q-td>
        </template>
      </q-table>
    </div>

    <q-banner inline-actions rounded class="text-white q-mt-md">
      <span v-if="!loading || result"> Total: {{ pageInfo.totalCount }} </span>

      <template v-slot:action>
        <tooltip-button
          :disabled="!pageInfo.hasPreviousPage"
          round
          color="secondary"
          flat
          icon="las la-angle-left"
          tooltip="Previous page"
          :loading="loading"
          @click="previousPage"
        />
        <tooltip-button
          :disabled="!pageInfo.hasNextPage"
          round
          color="secondary"
          flat
          icon="las la-angle-right"
          tooltip="Next page"
          :loading="loading"
          @click="nextPage"
        />
      </template>
    </q-banner>
  </div>
</template>
