<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

import backgroundXSBL from 'src/assets/background/jiroe-matia-rengel-b9kh72kOcdM-unsplash-xsbl.jpg?base64'
import { graphql } from 'src/graphql/generated'

import { editTemplate } from 'src/router/routes'
import { useRouter } from 'vue-router'
import { useIsServer } from 'src/hooks/is-server'

import DateTime from 'src/components/date-time.vue'
import TooltipButton from 'src/components/tooltip-button.vue'
import { TemplateListQueryVariables } from 'src/graphql/generated/graphql'

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

  return 5
})

const variables = ref<Pick<TemplateListQueryVariables, 'after' | 'before'>>({
  after: null,
  before: null,
})

const computedVariables = computed<TemplateListQueryVariables>(() => {
  return {
    first: variables.value.before ? undefined : itemsPerRow.value * rowCount.value,
    last: variables.value.before ? itemsPerRow.value * rowCount.value : undefined,
    ...variables.value,
  }
})

const { error, refetch, result, loading } = useQuery(
  graphql(`
    query TemplateList($first: Int, $last: Int, $after: String, $before: String) {
      templates(first: $first, last: $last, after: $after, before: $before) {
        pageInfo {
          totalCount
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            name
            updatedAt
            banner
            description
            fields
          }
        }
      }
    }
  `),
  computedVariables,
  { prefetch: false, fetchPolicy: 'no-cache' }
)

const q = useQuasar()

const colClass = computed(() => {
  return `col-${12 / itemsPerRow.value}`
})

const router = useRouter()

const createEditPath = (id: string) => {
  return router.resolve({
    name: editTemplate.name,
    params: {
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
</script>

<template>
  <transition name="card" mode="out-in">
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

    <div v-else-if="error">
      {{ error }}
    </div>

    <div class="col-12 column" v-else>
      <q-banner inline-actions rounded class="text-white q-mb-md col">
        <span v-if="result">
          Showing {{ result.templates.edges.length }} of {{ result.templates.pageInfo.totalCount }}
        </span>

        <template v-slot:action>
          <tooltip-button
            round
            color="secondary"
            flat
            icon="las la-sync"
            tooltip="Refresh"
            :loading="loading"
            @click="refetch"
          />
        </template>
      </q-banner>

      <div class="results-container column col" v-if="result">
        <q-scroll-area style="height: 1000px; width: 100%">
          <div class="row q-col-gutter-md">
            <transition-group name="list">
              <div :class="colClass" v-for="edge of result.templates.edges" :key="edge.cursor">
                <router-link :to="createEditPath(edge.node.id)">
                  <q-card v-ripple flat>
                    <q-img
                      :src="
                        edge.node.banner || `https://picsum.photos/seed/${edge.node.id}/360/203.jpg`
                      "
                      :placeholder-src="backgroundXSBL"
                      height="150px"
                      fit="cover"
                    >
                      <div class="absolute-bottom text-h6">
                        {{ edge.node.name || 'Unnamed template' }}
                      </div>
                    </q-img>

                    <q-card-section>
                      <q-item dense class="q-pa-none">
                        <q-item-section>
                          <q-item-label caption>
                            Updated <date-time :model-value="edge.node.updatedAt" />
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-card-section>
                  </q-card>
                </router-link>
              </div>
            </transition-group>
          </div>
        </q-scroll-area>
      </div>

      <q-banner inline-actions rounded class="text-white q-mt-md">
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
  </transition>
</template>
