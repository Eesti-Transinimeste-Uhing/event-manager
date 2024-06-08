<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'src/hooks/use-i18n'
import { useUserPreferencesStore } from 'src/stores/user-preferences'

const userPreferencesStore = useUserPreferencesStore()
const { darkMode } = storeToRefs(userPreferencesStore)

const { t } = useI18n()
</script>

<template>
  <div class="row items-center">
    <q-icon name="las la-sun" size="sm" />

    <q-toggle
      :model-value="darkMode"
      @update:model-value="(v) => userPreferencesStore.setDarkMode(v)"
      v-bind="$attrs"
    >
      <q-tooltip class="bg-black" anchor="center left" self="center right">
        {{ t('dark-mode') }}
      </q-tooltip>
    </q-toggle>
  </div>
</template>
