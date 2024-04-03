<script lang="ts" setup>
import { useQuasar } from 'quasar'

const q = useQuasar()
</script>

<template>
  <q-toggle :model-value="q.dark.isActive" @update:model-value="(v) => q.dark.set(v)" />
</template>
