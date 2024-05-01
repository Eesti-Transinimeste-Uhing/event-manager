<script lang="ts" setup>
import { ref } from 'vue'
import { DateTime } from 'luxon'

import DateTimeField from 'src/components/form/date-time-field.vue'

const format = 'yyyy-MM-DD HH:mm'
const dt = ref(DateTime.now())
</script>

<style lang="scss" scoped>
.dev-card {
  height: 500px;
}
</style>

<template>
  <date-time-field v-model="dt" :format="format" />
</template>
