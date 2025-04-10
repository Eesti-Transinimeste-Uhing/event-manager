<script lang="ts" setup>
import { useQuery, useMutation } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import backgroundXSBL from 'src/assets/background/jiroe-matia-rengel-b9kh72kOcdM-unsplash-xsbl.jpg?base64'
import { graphql } from 'src/graphql/generated'
import { TemplateListQueryVariables, PaginationSortingOrder } from 'src/graphql/generated/graphql'

import { templateEdit } from 'src/router/routes'
import { useIsServer } from 'src/hooks/is-server'

import DateTime from 'components/date-time.vue'
import TooltipButton from 'components/tooltip-button.vue'
import EmptyContent from 'components/empty-content.vue'
import { useNotificationsStore } from 'src/stores/notifications'
import { useI18n } from 'src/hooks/use-i18n'

const { isServer } = useIsServer()

const itemsPerRow = computed(() => {
  if (isServer.value) return 4

  if (q.screen.gt.lg) return 6
  if (q.screen.gt.md) return 4
  if (q.screen.gt.sm) return 3
  if (q.screen.gt.xs) return 2

  return 1
})

const rowCount = computed(() => {
  if (isServer.value) return 4

  return Math.floor((q.screen.height - 200) / 212)
})

const sortDir = ref<PaginationSortingOrder>(PaginationSortingOrder.Desc)

const variables = ref<Pick<TemplateListQueryVariables, 'after' | 'before'>>({
  after: null,
  before: null,
})

const toggleSortDir = () => {
  variables.value = {
    after: null,
    before: null,
  }

  sortDir.value =
    sortDir.value === PaginationSortingOrder.Asc
      ? PaginationSortingOrder.Desc
      : PaginationSortingOrder.Asc
}

const filterText = ref('')

const { t, currentLanguage } = useI18n()

const computedVariables = computed<TemplateListQueryVariables>(() => {
  return {
    first: variables.value.before ? undefined : itemsPerRow.value * rowCount.value,
    last: variables.value.before ? itemsPerRow.value * rowCount.value : undefined,
    filter: {
      columns: ['name'],
      query: filterText.value,
    },
    sort: {
      order: sortDir.value,
      columns: ['updatedAt'],
    },
    lang: currentLanguage.value,
    ...variables.value,
  }
})

const { error, refetch, result, loading } = useQuery(
  graphql(`
    query TemplateList(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $filter: PaginationFilter!
      $sort: PaginationSorting!
      $lang: SupportedLanguages!
    ) {
      templates(
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
            name(where: { language: $lang })
            updatedAt
            banner
          }
        }
      }
    }
  `),
  computedVariables,
  { prefetch: false, fetchPolicy: 'no-cache' }
)

const mutation = useMutation(
  graphql(`
    mutation CreateTemplate {
      createTemplate {
        id
      }
    }
  `)
)

const q = useQuasar()

const colClass = computed(() => {
  return `col-${12 / itemsPerRow.value}`
})

const router = useRouter()

const createEditPath = (id: string) => {
  return router.resolve({
    name: templateEdit.name,
    query: {
      id,
    },
  })
}

const handleNextPage = () => {
  variables.value = {
    after: result.value?.templates.pageInfo.endCursor,
    before: null,
  }
}

const handlePreviousPage = () => {
  variables.value = {
    after: null,
    before: result.value?.templates.pageInfo.startCursor,
  }
}

const notifications = useNotificationsStore()

const handleCreateNewClick = async () => {
  try {
    const result = await mutation.mutate()

    await router.push({
      name: templateEdit.name,
      query: {
        id: result?.data?.createTemplate.id,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      notifications.enqueue({
        type: 'error',
        lines: [t('cannot-create-template'), error.message],
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.template-name {
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6);
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>

<template>
  <div v-if="(loading && !result) || isServer" class="column">
    <q-banner inline-actions rounded class="text-white q-mb-md">
      <q-skeleton type="rect" height="30px" />
    </q-banner>

    <div class="row q-col-gutter-md">
      <div :class="colClass" v-for="index in 15" :key="index">
        <q-card flat>
          <q-skeleton height="150px" square />

          <q-card-section>
            <q-item dense>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-banner inline-actions rounded class="text-white q-mt-md">
      <template v-slot:action>
        <q-skeleton type="circle" class="q-ml-sm" />
        <q-skeleton type="circle" class="q-ml-sm" />
      </template>
    </q-banner>
  </div>

  <empty-content
    v-else-if="error"
    icon="las la-times"
    :title="$t('network-error')"
    :content="error.message"
    icon-colour="red"
  />

  <div class="col column" v-else>
    <q-banner inline-actions rounded class="text-white q-mb-md q-py-none">
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

        <tooltip-button
          color="primary"
          round
          icon="las la-plus"
          :tooltip="$t('create-new')"
          :loading="mutation.loading.value"
          @click="handleCreateNewClick"
          class="q-ml-sm"
        />
      </template>
    </q-banner>

    <div class="results-container column col" v-if="result">
      <div class="row q-col-gutter-md">
        <transition-group name="list">
          <div :class="colClass" v-for="edge of result.templates.edges" :key="edge.node.id">
            <router-link :to="createEditPath(edge.node.id)">
              <q-card v-ripple flat>
                <q-img
                  :src="edge.node.banner"
                  :placeholder-src="backgroundXSBL"
                  height="212px"
                  fit="cover"
                >
                  <div class="absolute-bottom template-name row items-center justify-between">
                    <span class="text-h6">{{ edge.node.name || $t('unnamed-template') }}</span>
                    <span class="text-subtitle2">
                      <date-time :model-value="edge.node.updatedAt" />
                    </span>
                  </div>
                </q-img>
              </q-card>
            </router-link>
          </div>
        </transition-group>
      </div>
    </div>

    <q-banner inline-actions rounded class="text-white q-mt-md">
      <span v-if="result"> {{ t('total') }}: {{ result.templates.pageInfo.totalCount }} </span>

      <template v-if="result" v-slot:action>
        <tooltip-button
          :disabled="!result.templates.pageInfo.hasPreviousPage"
          round
          color="secondary"
          flat
          icon="las la-angle-left"
          tooltip="Previous page"
          :loading="loading"
          @click="handlePreviousPage"
        />
        <tooltip-button
          :disabled="!result.templates.pageInfo.hasNextPage"
          round
          color="secondary"
          flat
          icon="las la-angle-right"
          tooltip="Next page"
          :loading="loading"
          @click="handleNextPage"
        />
      </template>
    </q-banner>
  </div>
</template>
