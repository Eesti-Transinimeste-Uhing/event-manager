<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import LanguageSelector from 'src/components/i18n/language-selector.vue'

import perlinDark from 'assets/background/perlin-dark.jpg'
import StickyToolbar from 'components/sticky-toolbar.vue'
import { useUserPreferencesStore } from 'src/stores/user-preferences'
import { useI18n } from 'src/hooks/use-i18n'

const userPreferencesStore = useUserPreferencesStore()
const { darkMode } = storeToRefs(userPreferencesStore)

const { t } = useI18n()

const background = computed(() => {
  return `url(${perlinDark})`
})

const gradientColour1 = computed(() => {
  return `rgb(86, 172, 252, ${darkMode.value ? 0.5 : 1})`
})

const gradientColour2 = computed(() => {
  return `rgba(246, 144, 230, ${darkMode.value ? 0.2 : 0.5})`
})

const gradientColour3 = computed(() => {
  return `rgba(255, 236, 70, ${darkMode.value ? 0.1 : 0.2})`
})
</script>

<template>
  <q-layout view="lHh lpr lff" class="layout-root">
    <div v-if="darkMode" class="anti-band-hack" />

    <q-page-container class="fit">
      <router-view v-slot="{ Component, route }">
        <transition name="card" mode="out-in">
          <div class="fit absolute" :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>

      <q-card flat class="row justify-end">
        <language-selector />
      </q-card>

      <sticky-toolbar />
    </q-page-container>

    <q-footer class="bg-transparent">
      <q-card flat square class="row justify-between q-px-md bg-transparent">
        <q-card-section class="column">
          <a
            :href="t('site-link')"
            rel="noopener"
            target="_blank"
            class="text-subtitle1"
            :class="{ 'text-dark': !darkMode }"
          >
            {{ t('brand-name') }}
          </a>
        </q-card-section>

        <q-card-section class="column">
          <a
            :href="t('tos-and-privacy-link')"
            rel="noopener"
            target="_blank"
            class="text-subtitle2"
            :class="{ 'text-dark': !darkMode }"
          >
            {{ t('tos-and-privacy') }}
          </a>
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.anti-band-hack {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-image: v-bind(background);
  background-size: 4px;
  mix-blend-mode: screen;
}

.layout-root {
  height: 100vh;
  background-image: radial-gradient(
    circle at 85% 35%,
    v-bind(gradientColour1) 0%,
    v-bind(gradientColour1) 2%,
    v-bind(gradientColour2) 18%,
    v-bind(gradientColour3) 40%,
    transparent 70%
  );
  mix-blend-mode: difference;
  background-repeat: no-repeat;
}
</style>
