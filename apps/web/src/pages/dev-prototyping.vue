<script lang="ts" setup>
import ComponentTranslator from 'src/components/component-translator.vue'
</script>

<style lang="scss" scoped>
.dev-card {
  height: 500px;
}
</style>

<template>
  <component-translator>
    <template #et-EE> ET </template>
    <template #en-GB> EN </template>
    <template #ru-RU> RU </template>
  </component-translator>
</template>
