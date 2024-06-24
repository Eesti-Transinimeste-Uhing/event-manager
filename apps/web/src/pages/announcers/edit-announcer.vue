<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const announcerId = computed(() => route.params.id)
</script>

<template>
  <h1>Editing {{ announcerId }}</h1>
</template>
