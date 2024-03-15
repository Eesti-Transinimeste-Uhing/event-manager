<script lang="ts" setup>
import background from 'src/assets/background/jiroe-matia-rengel-b9kh72kOcdM-unsplash-small.jpg'
</script>

<template>
  <div class="fit absolute">
    <q-img class="col absolute top left" :src="background" no-spinner fit="cover" height="100%" />
    <div class="fit backdrop" />
  </div>

  <div class="fit absolute">
    <q-card class="fixed-center login-card">
      <q-card-section>
        <div class="text-h4">Welcome!</div>
        <div class="text-subtitle2">Link your Discord account to log in</div>
      </q-card-section>

      <q-separator />

      <q-card-section horizontal class="q-ma-md">
        <q-icon name="las la-exclamation" size="md" color="warning" />
        This section of the event bot is for Eesti Transinimeste Ühing staff and volunteers. If
        you're a guest of ours, please use the links we posted to register for events.
      </q-card-section>

      <q-separator />

      <q-card-section horizontal>
        <q-card-actions class="fit justify-center q-pa-none">
          <q-btn class="fit" flat color="blue" icon="lab la-discord" label="Log in" size="lg" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.login-card {
  width: 100%;
  max-width: 350px;
}

.backdrop {
  backdrop-filter: blur(5px);
}
</style>
