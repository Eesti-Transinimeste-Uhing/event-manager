<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { computed } from 'vue'
import { QTableColumn } from 'quasar'

import ButtonSelect from 'components/button-select.vue'

import { graphql } from 'src/graphql/generated'
import { FormEdge, FormListQuery, PaginationSortingOrder } from 'src/graphql/generated/graphql'
import EmptyContent from 'src/components/empty-content.vue'
import { useCursorPagination } from 'src/hooks/use-cursor-pagination'
import DateTime from 'src/components/date-time.vue'
import TooltipButton from 'src/components/tooltip-button.vue'
import TableSkeleton from 'components/skeletons/table-skeleton.vue'
import { useNotificationsStore } from 'src/stores/notifications'
import { formEdit } from 'src/router/routes'
import { useI18n } from 'src/hooks/use-i18n'

const { t, currentLanguage } = useI18n()

const extraVariables = computed(() => ({
  lang: currentLanguage.value,
}))

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
      $lang: SupportedLanguages!
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
            name(where: { language: $lang })
            banner
            template {
              id
              name(where: { language: $lang })
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
    extraVariables,
  }
)

const columns: QTableColumn<FormListQuery['forms']['edges'][0]>[] = [
  {
    name: 'thumbnail',
    label: '',
    align: 'center',
    style: 'width: 50px;',
    field(row) {
      return row.node.banner
    },
  },
  {
    name: 'name',
    label: 'name',
    align: 'left',
    field(row) {
      return row.node.name
    },
  },
  {
    name: 'templateName',
    label: 'template',
    align: 'left',
    field(row) {
      return row.node.template.name
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
        lines: [t('couldnt-create'), result.errors.map((error) => error.message).join('\n')],
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
        lines: [t('couldnt-create'), error.message],
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
      $lang: SupportedLanguages!
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
            name(where: { language: $lang })
          }
        }
      }
    }
  `),
  {
    defaultFilterColumns: ['name'],
    defaultSortColumns: ['name'],
    extraVariables,
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

const handleRowClick = (evt: Event, row: FormEdge) => {
  return router.push({
    name: formEdit.name,
    params: {
      id: row.node.id,
    },
  })
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
          @update:model-value="(selected: string) => handleCreateNew(selected)"
          :loading="mutation.loading.value"
          position="right"
        >
          <template #prepend>
            <q-input
              class="fit q-px-md"
              borderless
              v-model="templatesFilter"
              clear-icon="las la-times"
              no-error-icon
              hide-bottom-space
              :label="$t('search-templates-ellipsis')"
              :debounce="300"
            ></q-input>

            <q-linear-progress v-if="templatesLoading" indeterminate />

            <q-separator v-else />
          </template>
        </button-select>
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
        :rows="result.forms.edges"
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

        <template #body-cell-thumbnail="props">
          <q-td :props="props">
            <q-avatar size="25px">
              <q-tooltip class="q-pa-none" anchor="center left" self="center right">
                <q-img :src="props.value" width="196px" height="108px" no-spinner />
              </q-tooltip>

              <q-img :src="props.value" height="25px" width="25px" no-spinner />
            </q-avatar>
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
