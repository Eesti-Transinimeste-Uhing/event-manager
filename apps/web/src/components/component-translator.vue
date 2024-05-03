<script lang="ts" setup>
import { SupportedLanguages } from 'src/stores/i18n'
import { computed, ref, useSlots } from 'vue'

import LanguageTabs from './language-tabs.vue'

const slots = useSlots()
const state = ref<SupportedLanguages>('et-EE')

const slotCount = computed(() => {
  return Object.keys(slots).length
})
</script>

<template>
  <div class="column">
    <language-tabs v-model="state" align="left" small />

    <q-card flat>
      <q-tab-panels v-if="'default' in slots" v-model="state">
        <q-tab-panel :key="state" :name="state">
          <slot name="default" />
        </q-tab-panel>
      </q-tab-panels>

      <q-tab-panels v-else-if="slotCount > 1" v-model="state" animated>
        <q-tab-panel v-for="lang in SupportedLanguages" :key="lang" :name="lang">
          <slot :name="lang" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
