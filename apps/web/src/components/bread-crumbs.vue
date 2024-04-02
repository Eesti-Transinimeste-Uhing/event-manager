<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { index } from 'src/router/routes'
import { RouteRecord } from 'src/router/routes'

const route = useRoute()

const parts = computed<RouteRecord[]>(() => {
  return [index, ...(route.meta.path as RouteRecord[]), route as unknown as RouteRecord]
})
</script>

<template>
  <q-breadcrumbs>
    <template v-slot:separator>
      <q-icon name="las la-angle-right" color="primary" />
    </template>

    <q-breadcrumbs-el
      v-for="(part, index) of parts"
      :key="part.name || part.path"
      :label="part.meta.label"
      :icon="part.meta.icon"
      :to="index === parts.length - 1 ? null : part"
    />
  </q-breadcrumbs>
</template>
