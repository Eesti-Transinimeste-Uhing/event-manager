<script lang="ts" setup>
import { graphql } from 'src/graphql/generated'

graphql(`
  query TestQuery {
    checkDiscordToken
  }
`)
</script>

<template>
  <q-card class="fixed-center card">
    <q-card-section>
      <div class="text-h5">Securing your session...</div>
      <div class="text-subtitle2">Please wait</div>
    </q-card-section>

    <q-linear-progress indeterminate />
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 350px;
}
</style>
