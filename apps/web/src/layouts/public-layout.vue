<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import AccountMenu from 'src/components/account-menu.vue'
import BreadCrumbs from 'src/components/bread-crumbs.vue'
import SiteLogo from 'src/components/site-logo.vue'
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
</script>

<style lang="scss" scoped>
.site-logo {
  height: 25px;
}
</style>

<template>
  <q-layout view="lHh lpr lff" class="layout-root">
    <q-page-container class="fit">
      <q-page class="page-padding column fit q-pa-md">
        <router-view v-slot="{ Component, route }">
          <transition name="card" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>

        <q-slide-transition>
          <q-page-sticky
            v-if="!loading && result?.viewer && result.viewer.roles.length > 0 && !error"
            position="top"
            expand
            class="bg-dark text-secondary"
          >
            <q-toolbar>
              <q-toolbar-title class="flex items-center">
                <site-logo class="site-logo q-mr-sm" />
                <span class="font-pragati">ETÜ Event Planner</span>

                <q-separator vertical class="q-mx-md" dark />

                <bread-crumbs class="text-body2" />
              </q-toolbar-title>

              <account-menu />
            </q-toolbar>
          </q-page-sticky>
        </q-slide-transition>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.layout-root {
  height: 100vh;
  background-color: white;
  background-image: radial-gradient(
    circle at 85% 35%,
    rgba(86, 205, 252, 1) 0%,
    rgba(246, 144, 230, 0.5) 20%,
    rgba(255, 236, 70, 0.2) 40%,
    transparent 70%
  );
  mix-blend-mode: difference;
  background-repeat: no-repeat;
}
</style>
