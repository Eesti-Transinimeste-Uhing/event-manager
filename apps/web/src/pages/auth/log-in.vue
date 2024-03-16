<script lang="ts" setup>
import siteLogo from 'components/site-logo.vue'
</script>

<template>
  <q-card class="fixed-center card">
    <q-card-section class="row">
      <site-logo class="col-1 q-mr-sm" />
      <div class="text-h4">Welcome!</div>
      <div class="text-subtitle2">Link your Discord account to log in</div>
    </q-card-section>

    <q-separator />

    <q-card-section horizontal class="q-ma-md">
      <q-icon name="las la-exclamation" size="md" color="warning" />
      This section of the event bot is for Eesti Transinimeste Ühing staff and volunteers. If you're
      a guest of ours, please use the links we posted to register for events.
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
          href="//localhost:3000/v1/auth/discord"
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
