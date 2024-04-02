<script lang="ts" setup>
import { config } from 'src/config'
import * as route from 'src/router/routes'

const routes = [route.dashboard, route.templates, route.forms]
</script>

<style lang="scss" scoped>
.nav-list {
  height: 100vh;
}
</style>

<template>
  <q-list class="nav-list column justify-between">
    <div class="items">
      <q-item v-for="route in routes" :key="route.path" :to="route.path" v-ripple exact>
        <q-item-section avatar>
          <q-icon :name="route.meta.icon" />
        </q-item-section>
        <q-item-section>{{ route.meta.label }}</q-item-section>
      </q-item>
    </div>

    <q-item v-ripple clickable :href="config.backend.logoutUrl">
      <q-item-section avatar>
        <q-icon name="las la-sign-out-alt" />
      </q-item-section>
      <q-item-section>Log out</q-item-section>
    </q-item>
  </q-list>
</template>
