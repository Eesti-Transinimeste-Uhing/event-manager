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
      <q-card-section horizontal>
        <q-img class="col" src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-card-actions vertical class="justify-around">
          <q-btn flat round color="red" icon="la la-heart" />
          <q-btn flat round color="accent" icon="la la-bookmark" />
          <q-btn flat round color="primary" icon="la la-share" />
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
