<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'

import AccountMenu from 'src/components/account-menu.vue'
import BreadCrumbs from 'src/components/bread-crumbs.vue'
import SiteLogo from 'src/components/site-logo.vue'
import TooltipButton from './tooltip-button.vue'

import { graphql } from 'src/graphql/generated'

const { result, loading, error } = useQuery(
  graphql(`
    query PublicLayoutViewer {
      viewer {
        id
        roles
      }
    }
  `),
  {},
  { prefetch: false }
)

const morphState = ref<'bar' | 'button'>('button')
</script>

<style lang="scss" scoped>
.site-logo {
  height: 25px;
}

.sticky-button {
  border-radius: 50%;
}
</style>

<template>
  <q-page-sticky
    v-if="!loading && result?.viewer && result.viewer.roles.length > 0 && !error"
    position="top"
    expand
    class="bg-dark text-secondary"
    v-morph:bar:toolbar:300.resize="morphState"
  >
    <q-toolbar>
      <q-toolbar-title class="flex items-center">
        <site-logo class="site-logo q-mr-sm" />
        <span class="font-pragati">ETÜ Event Planner</span>

        <q-separator vertical class="q-mx-md" dark />

        <bread-crumbs class="text-body2" />
      </q-toolbar-title>

      <account-menu />

      <tooltip-button
        tooltip="Collapse staff toolbar"
        position="bottom left"
        round
        flat
        color="secondary"
        class="q-ml-sm"
        icon="las la-angle-right"
        @click="morphState = 'button'"
      />
    </q-toolbar>
  </q-page-sticky>

  <transition name="card" mode="out-in">
    <q-page-sticky
      v-if="!loading && result?.viewer && result.viewer.roles.length > 0 && !error"
      position="top-right"
      expand
      class="sticky-button"
      v-morph:button:toolbar:300="morphState"
    >
      <tooltip-button
        tooltip="Expand staff toolbar"
        position="bottom left"
        round
        color="secondary"
        icon="las la-angle-left"
        class="q-ma-md"
        @click="morphState = 'bar'"
      />
    </q-page-sticky>
  </transition>
</template>
