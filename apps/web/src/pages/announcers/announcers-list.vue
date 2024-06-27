<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { QTableColumn } from 'quasar'

import { graphql } from 'src/graphql/generated'
import {
  AnnouncerListQuery,
  AnnouncerType,
  FormEdge,
  PaginationSortingOrder,
} from 'src/graphql/generated/graphql'
import EmptyContent from 'components/empty-content.vue'
import { useCursorPagination } from 'src/hooks/use-cursor-pagination'
import DateTime from 'components/date-time.vue'
import TooltipButton from 'components/tooltip-button.vue'
import TableSkeleton from 'components/skeletons/table-skeleton.vue'
import { useNotificationsStore } from 'src/stores/notifications'
import { useI18n } from 'src/hooks/use-i18n'
import { announcerEdit } from 'src/router/routes'
import ButtonSelect from 'components/button-select.vue'
import { getIconForType } from './get-icon-for-type'

const { t } = useI18n()

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
  'announcers',
  graphql(`
    query AnnouncerList(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $filter: PaginationFilter!
      $sort: PaginationSorting!
    ) {
      announcers(
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
            name
            type
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

const columns: QTableColumn<AnnouncerListQuery['announcers']['edges'][0]>[] = [
  {
    name: 'name',
    label: 'name',
    align: 'left',
    field(row) {
      return row.node.name
    },
  },
  {
    name: 'type',
    label: 'type',
    align: 'left',
    field(row) {
      return row.node.type
    },
  },
  {
    name: 'createdAt',
    label: 'created',
    align: 'left',
    style: 'width: 150px;',
    field(row) {
      return row.node.createdAt
    },
  },
  {
    name: 'updatedAt',
    label: 'updated',
    align: 'left',
    style: 'width: 150px;',
    field(row) {
      return row.node.updatedAt
    },
  },
]

const mutation = useMutation(
  graphql(`
    mutation CreateAnnouncer($data: CreateAnnouncerData!) {
      createAnnouncer(data: $data) {
        id
      }
    }
  `)
)

const router = useRouter()
const notifications = useNotificationsStore()

const handleCreateNewClick = async (type: AnnouncerType) => {
  try {
    const result = await mutation.mutate({
      data: {
        type,
      },
    })

    if (result?.errors) {
      notifications.enqueue({
        type: 'error',
        lines: [t('couldnt-create'), result.errors.map((error) => error.message).join('\n')],
      })
    }

    router.push({
      name: announcerEdit.name,
      query: {
        id: result?.data?.createAnnouncer.id,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      notifications.enqueue({
        type: 'error',
        lines: [t('couldnt-create'), error.message],
      })
    }
  }
}

const handleRowClick = (evt: Event, row: FormEdge) => {
  return router.push({
    name: announcerEdit.name,
    query: {
      id: row.node.id,
    },
  })
}

const options = computed(() => {
  return Object.keys(AnnouncerType)
    .filter((key) => typeof key === 'string' && key !== AnnouncerType.Unset)
    .map((key) => ({ label: key, value: key }))
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
      <q-input borderless :debounce="300" v-model="filterText" :label="$t('search-ellipsis')" />

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
          :tooltip="$t('refresh')"
          :loading="loading"
          @click="refetch"
        />

        <button-select
          :tooltip="$t('create-new')"
          :model-value="null"
          :options="options"
          color="primary"
          round
          icon="las la-plus"
          class="q-ml-sm"
          @update:model-value="(selected) => handleCreateNewClick(selected as AnnouncerType)"
          :loading="mutation.loading.value"
          position="right"
        />
      </template>
    </q-banner>

    <table-skeleton v-if="loading && !result" class="col" />

    <empty-content
      v-else-if="error"
      :content="error.message"
      :title="$t('network-error')"
      icon="las la-times"
      icon-colour="red"
    />

    <div class="col" v-else-if="result">
      <q-table
        flat
        class="fit"
        :rows="result.announcers.edges"
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
              <span class="text-weight-bolder">{{ $t(col.label) }}</span>
            </q-th>
          </q-tr>
        </template>

        <template #body-cell-type="props">
          <q-td :props="props">
            <q-icon :name="getIconForType(props.value)" size="sm">
              <q-tooltip class="bg-black" anchor="top middle" self="center middle">
                {{ props.row.node.type }}
              </q-tooltip>
            </q-icon>
          </q-td>
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
          :tooltip="t('previous-page')"
          :loading="loading"
          @click="previousPage"
        />
        <tooltip-button
          :disabled="!pageInfo.hasNextPage"
          round
          color="secondary"
          flat
          icon="las la-angle-right"
          :tooltip="t('next-page')"
          :loading="loading"
          @click="nextPage"
        />
      </template>
    </q-banner>
  </div>
</template>
