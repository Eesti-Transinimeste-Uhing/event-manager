<script lang="ts" setup>
import * as route from 'src/router/routes'

const routes = [route.indexDashboard]
</script>

<template>
  <q-list>
    <q-item v-for="route in routes" :key="route.path" :to="route.path">
      <q-item-section avatar>
        <q-icon :name="route.meta.icon" />
      </q-item-section>
      <q-item-section>{{ route.meta.label }}</q-item-section>
    </q-item>
  </q-list>
</template>
