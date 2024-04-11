<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const message = computed(() =>
  decodeURIComponent(
    (Array.isArray(route.query.message) ? route.query.message.join(' ') : route.query.message) ?? ''
  )
)
</script>

<template>
  <q-card class="fixed-center card">
    <q-card-section>
      <div class="text-h5">{{ $t('error') }}</div>
      <div class="text-subtitle2">{{ $t('could-not-auth-discord') }}</div>
    </q-card-section>

    <q-no-ssr>
      <q-banner inline-actions class="text-white bg-red">
        {{ message }}
      </q-banner>
      <template v-slot:placeholder>
        <q-banner inline-actions class="text-white bg-red q-px-none">
          <q-linear-progress indeterminate color="white" />
        </q-banner>
      </template>
    </q-no-ssr>

    <q-card-section horizontal class="q-ma-md">
      <q-icon name="las la-exclamation" size="md" color="red" />
      {{ $t('auth-flow-error') }}
    </q-card-section>

    <q-separator />

    <q-card-section horizontal>
      <q-card-actions class="fit justify-center q-pa-none">
        <q-btn
          class="fit"
          flat
          color="blue"
          icon="las la-chevron-left"
          label="Try again"
          size="lg"
          to="/auth/login"
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
