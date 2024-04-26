<script lang="ts" setup>
import siteLogo from 'components/site-logo.vue'
import { onMounted } from 'vue'

import { apolloClient } from 'src/graphql/apollo/client'
import { config } from 'src/config'

onMounted(async () => {
  await apolloClient.resetStore()
})
</script>

<template>
  <q-card class="fixed-center card">
    <q-card-section class="row">
      <site-logo class="col-1 q-mr-sm" />
      <div class="text-h4">{{ $t('welcome') }}</div>
      <div class="text-subtitle2">{{ $t('link-discord-to-log-in') }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section horizontal class="q-ma-md">
      <q-icon name="las la-exclamation" size="md" color="warning" />
      {{ $t('login-page-staff-only') }}
    </q-card-section>

    <q-separator />

    <q-card-section horizontal>
      <q-card-actions class="fit justify-center q-pa-none">
        <q-btn
          class="fit"
          flat
          color="blue"
          icon="lab la-discord"
          label="Log in"
          size="lg"
          :href="config.backend.loginUrl"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 350px;
}
</style>
