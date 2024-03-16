<script lang="ts" setup>
import NavigationMenu from 'components/navigation-menu.vue'
import SiteLogo from 'components/site-logo.vue'

import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const quasar = useQuasar()
const route = useRoute()

const drawerOpenByUserChoice = ref(false)
const drawerOpen = computed(() => (quasar.screen.gt.sm ? true : drawerOpenByUserChoice.value))

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
  min-height: 100vh;
}

.site-logo {
  height: 30px;
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
          <span class="font-pragati">ETÜ Event Planner</span>
        </q-toolbar-title>
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

    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md">
        <router-view v-slot="{ Component }">
          <transition name="card" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

        <q-page-sticky position="top" expand class="bg-secondary text-white">
          <q-toolbar>
            <q-icon flat round size="md" :name="String(route.meta.icon)" />
            <q-toolbar-title>{{ route.meta.label }}</q-toolbar-title>
          </q-toolbar>
        </q-page-sticky>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>
