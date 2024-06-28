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
import { useI18n } from 'src/hooks/use-i18n'
import { formEdit, templateEdit } from 'src/router/routes'

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
  refetch,
} = useCursorPagination(
  'formSubmissions',
  graphql(`
    query FormSubmissionList(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $filter: PaginationFilter!
      $sort: PaginationSorting!
      $lang: SupportedLanguages!
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
              name(where: { language: $lang })
              template {
                id
                name(where: { language: $lang })
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
    extraVariables,
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
      label: t('form'),
      align: 'left',
      style: 'width: 250px;',
      field(row) {
        return row.node.form
      },
    },
    {
      name: 'template',
      label: t('template'),
      align: 'left',
      style: 'width: 250px;',
      field(row) {
        return row.node.form.template
      },
    },
    ...dynamicColumns,
    {
      name: 'createdAt',
      label: t('created'),
      align: 'left',
      style: 'width: 150px;',
      field(row) {
        return row.node.createdAt
      },
    },
  ]
})

const createFormEditRoute = (id: string) => ({
  name: formEdit.name,
  query: { id },
})

const createTemplateEditRoute = (id: string) => ({
  name: templateEdit.name,
  query: { id },
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
          :tooltip="$t('sort')"
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
        :rows="result.formSubmissions.edges"
        :columns="columns"
        row-key="index"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <span class="text-weight-bolder">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>

        <template #body-cell-form="props">
          <q-td :props="props">
            <router-link :to="createFormEditRoute(props.value.id)" class="text-primary">
              {{ props.value.name }}
            </router-link>
          </q-td>
        </template>

        <template #body-cell-template="props">
          <q-td :props="props">
            <router-link :to="createTemplateEditRoute(props.value.id)" class="text-primary">
              {{ props.value.name }}
            </router-link>
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
      <span v-if="!loading || result"> {{ t('total') }}: {{ pageInfo.totalCount }} </span>

      <template v-slot:action>
        <tooltip-button
          :disabled="!pageInfo.hasPreviousPage"
          round
          color="secondary"
          flat
          icon="las la-angle-left"
          :tooltip="$t('previous-page')"
          :loading="loading"
          @click="previousPage"
        />
        <tooltip-button
          :disabled="!pageInfo.hasNextPage"
          round
          color="secondary"
          flat
          icon="las la-angle-right"
          :tooltip="$t('next-page')"
          :loading="loading"
          @click="nextPage"
        />
      </template>
    </q-banner>
  </div>
</template>
