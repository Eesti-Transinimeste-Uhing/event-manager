<script lang="ts" setup>
import NavigationMenu from 'components/navigation-menu.vue'
import SiteLogo from 'components/site-logo.vue'
import BreadCrumbs from 'components/bread-crumbs.vue'
import AccountMenu from 'components/account-menu.vue'

import IndexPage from 'src/pages/index-page.vue'

import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIsServer } from 'src/hooks/is-server'

const quasar = useQuasar()
const route = useRoute()

const drawerOpenByUserChoice = ref(false)

const { isServer } = useIsServer()

const drawerOpen = computed(() => {
  if (isServer.value) return true

  return quasar.screen.gt.sm ? true : drawerOpenByUserChoice.value
})

const handleDrawerToggle = (value?: boolean) => {
  if (typeof value === 'boolean') {
    drawerOpenByUserChoice.value = value
    return
  }

  drawerOpenByUserChoice.value = !drawerOpenByUserChoice.value
}
</script>

<style lang="scss" scoped>
.layout-root {
  height: 100vh;
}

.site-logo {
  height: 30px;
}

.page-padding {
  padding-top: 4rem;
}
</style>

<template>
  <q-layout view="lHh Lpr lfr" container class="layout-root">
    <q-header reveal>
      <q-toolbar>
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          round
          dense
          icon="las la-bars"
          @click="handleDrawerToggle()"
        />

        <q-toolbar-title class="flex items-center">
          <site-logo class="site-logo q-mr-sm" />
          <span class="font-pragati">{{ $t('site-label') }}</span>
        </q-toolbar-title>

        <account-menu />
      </q-toolbar>
    </q-header>

    <q-drawer
      :model-value="drawerOpen"
      :width="250"
      :breakpoint="700"
      bordered
      @hide="handleDrawerToggle(false)"
    >
      <q-scroll-area class="fit">
        <navigation-menu />
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="fit">
      <q-page class="page-padding column fit q-pa-md">
        <router-view v-slot="{ Component }">
          <transition name="card" mode="out-in">
            <component :is="Component ?? IndexPage" :key="route.name" />
          </transition>
        </router-view>

        <q-page-sticky position="top" expand class="bg-dark text-secondary">
          <q-toolbar>
            <bread-crumbs />
          </q-toolbar>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
