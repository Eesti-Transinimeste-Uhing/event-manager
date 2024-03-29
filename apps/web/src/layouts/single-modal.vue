<script lang="ts" setup>
import background from 'src/assets/background/jiroe-matia-rengel-b9kh72kOcdM-unsplash-lg.jpg'
import backgroundXSBL from 'src/assets/background/jiroe-matia-rengel-b9kh72kOcdM-unsplash-xsbl.jpg?base64'
</script>

<template>
  <q-layout view="lHh lpr lff" class="layout-root">
    <q-page-container class="fit">
      <div class="fit absolute">
        <q-img
          class="col absolute top left"
          :src="background"
          :placeholder-src="backgroundXSBL"
          no-spinner
          fit="cover"
          height="100%"
          no-transition
        />
        <div class="fit backdrop" />
      </div>

      <router-view v-slot="{ Component, route }">
        <transition name="card" mode="out-in">
          <div class="fit absolute" :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.layout-root {
  height: 100vh;
  background-color: $dark-page;
}

.backdrop {
  backdrop-filter: blur(5px);
}
</style>
