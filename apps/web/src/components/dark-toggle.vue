<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserPreferencesStore } from 'src/stores/user-preferences'

const userPreferencesStore = useUserPreferencesStore()
const { darkMode } = storeToRefs(userPreferencesStore)
</script>

<template>
  <q-toggle
    :model-value="darkMode"
    @update:model-value="(v) => userPreferencesStore.setDarkMode(v)"
  />
</template>
