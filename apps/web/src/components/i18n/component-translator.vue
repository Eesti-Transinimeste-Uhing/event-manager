<script lang="ts" setup>
import { computed, ref, useSlots, watch } from 'vue'

import LanguageTabs from './language-tabs.vue'
import { SupportedLanguages } from 'src/graphql/generated/graphql'

const props = withDefaults(
  defineProps<{
    square?: boolean
    defaultLanguage?: SupportedLanguages
  }>(),
  {
    defaultLanguage: SupportedLanguages.EtEe,
  }
)

const slots = useSlots()
const state = ref(props.defaultLanguage)

const slotCount = computed(() => {
  return Object.keys(slots).length
})

const emit = defineEmits<{
  (event: 'update:model-value', value: SupportedLanguages): void
}>()

watch(state, (newState) => {
  emit('update:model-value', newState)
})

const tabsWidth = computed(() => {
  return `${Object.keys(SupportedLanguages).length * 57}px`
})
</script>

<style lang="scss" scoped>
.tab-panel-card {
  border-top-left-radius: 0;
}

.tab-card {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: v-bind(tabsWidth);
}
</style>

<template>
  <div class="column">
    <q-card flat bordered class="tab-card">
      <language-tabs v-model="state" align="left" small :square="props.square" />
    </q-card>

    <q-card flat class="tab-panel-card">
      <q-tab-panels
        v-if="'default' in slots && slotCount === 1"
        v-model="state"
        :class="{ 'no-border-radius': props.square }"
      >
        <q-tab-panel :key="state" :name="state" class="q-pa-none">
          <slot name="default" />
        </q-tab-panel>
      </q-tab-panels>

      <slot v-else-if="'default' in slots" name="default" />

      <q-tab-panels
        v-if="slotCount > 1"
        v-model="state"
        animated
        :class="{ 'no-border-radius': props.square }"
        keep-alive
      >
        <q-tab-panel v-for="lang in SupportedLanguages" :key="lang" :name="lang" class="q-pa-none">
          <slot :name="lang" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
