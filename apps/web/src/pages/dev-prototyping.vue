<script lang="ts" setup>
import { ref } from 'vue'
import I18nInput from '../components/i18n/i18n-input.vue'
import { SupportedLanguages } from 'src/graphql/generated/graphql'

const value = ref<Record<SupportedLanguages, string>>({
  en_GB: '',
  et_EE: '',
  ru_RU: '',
})
</script>

<style lang="scss" scoped>
.dev-card {
  height: 500px;
}
</style>

<template>
  <i18n-input v-model="value" />
</template>
