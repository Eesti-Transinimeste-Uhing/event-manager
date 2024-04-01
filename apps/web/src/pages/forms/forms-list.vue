<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { computed } from 'vue'
import { QTableColumn } from 'quasar'

import ButtonSelect from 'components/button-select.vue'

import { graphql } from 'src/graphql/generated'
import { FormListQuery, PaginationSortingOrder } from 'src/graphql/generated/graphql'
import EmptyContent from 'src/components/empty-content.vue'
import { useCursorPagination } from 'src/hooks/use-cursor-pagination'
import DateTime from 'src/components/date-time.vue'
import TooltipButton from 'src/components/tooltip-button.vue'
import TableSkeleton from 'components/skeletons/table-skeleton.vue'
import { useNotificationsStore } from 'src/stores/notifications'
import { formEdit } from 'src/router/routes'

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
  filterText,
  refetch,
} = useCursorPagination(
  'forms',
  graphql(`
    query FormList(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $filter: [PaginationFilter!]
      $sort: [PaginationSorting!]
    ) {
      forms(
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
            updatedAt
            template {
              id
              name
              banner
              bannerOffset
            }
          }
        }
      }
    }
  `),
  {
    defaultFilterColumns: ['name'],
    defaultSortColumns: ['updatedAt'],
  }
)

const columns: QTableColumn<FormListQuery['forms']['edges'][0]>[] = [
  {
    name: 'templateName',
    label: 'Template',
    align: 'left',
    field(row) {
      return row.node.template.name
    },
  },
  {
    name: 'createdAt',
    label: 'Created',
    align: 'left',
    field(row) {
      return row.node.createdAt
    },
  },
  {
    name: 'updatedAt',
    label: 'Updated',
    align: 'left',
    field(row) {
      return row.node.updatedAt
    },
  },
]

const mutation = useMutation(
  graphql(`
    mutation CreateForm($input: CreateFormInput!) {
      createForm(input: $input) {
        id
      }
    }
  `)
)

const router = useRouter()
const notifications = useNotificationsStore()

const handleCreateNew = async (templateId: string) => {
  try {
    const result = await mutation.mutate({
      input: {
        templateId,
      },
    })

    if (result?.errors) {
      notifications.enqueue({
        type: 'error',
        lines: ["Couldn't create", result.errors.map((error) => error.message).join('\n')],
      })
    }

    router.push({
      name: formEdit.name,
      params: {
        id: result?.data?.createForm.id,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      notifications.enqueue({
        type: 'error',
        lines: ["Couldn't create", error.message],
      })
    }
  }
}

const {
  result: templatesResult,
  filterText: templatesFilter,
  loading: templatesLoading,
} = useCursorPagination(
  'templates',
  graphql(`
    query SearchTemplates(
      $filter: [PaginationFilter!]
      $first: Int
      $after: String
      $before: String
      $last: Int
      $sort: [PaginationSorting!]
    ) {
      templates(
        filter: $filter
        first: $first
        after: $after
        before: $before
        last: $last
        sort: $sort
      ) {
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
          totalCount
        }
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `),
  {
    defaultFilterColumns: ['name'],
    defaultSortColumns: ['name'],
  }
)

const options = computed(() => {
  return (
    templatesResult.value?.templates.edges.map((edge) => ({
      value: edge.node.id,
      label: edge.node.name,
    })) ?? []
  )
})
</script>

<style lang="scss" scoped>
.forms-list {
  height: calc(100vh - 130px);
}
</style>

<template>
  <div class="forms-list column justify-between">
    <q-banner inline-actions rounded class="q-mb-md q-py-none">
      <q-input borderless :debounce="300" v-model="filterText" label="Search..." />

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

        <button-select
          :model-value="null"
          :options="options"
          color="secondary"
          round
          icon="las la-plus"
          class="q-ml-sm"
          @update:model-value="(selected) => handleCreateNew(selected)"
          :loading="mutation.loading.value"
        >
          <template #prepend>
            <q-input
              class="fit q-px-md"
              borderless
              v-model="templatesFilter"
              clear-icon="las la-times"
              no-error-icon
              hide-bottom-space
              label="Search..."
              :debounce="300"
            ></q-input>

            <q-linear-progress v-if="templatesLoading" indeterminate />

            <q-separator v-else />
          </template>
        </button-select>
      </template>
    </q-banner>

    <table-skeleton v-if="loading && !result" />

    <empty-content
      v-else-if="error"
      :content="error.message"
      title="Network error"
      icon="las la-times"
      icon-colour="red"
    />

    <div class="table-wrapper col" v-else-if="result">
      <q-table
        flat
        :rows="result.forms.edges"
        :columns="columns"
        row-key="index"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        hide-header
        hide-bottom
      >
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
