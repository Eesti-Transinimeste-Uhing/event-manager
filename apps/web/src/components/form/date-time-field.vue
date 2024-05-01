<script lang="ts" setup>
import { DateTime as LuxonDateTime } from 'luxon'
import { computed, ref } from 'vue'

import DateTime from '../date-time.vue'

const props = defineProps<{
  modelValue: Date
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: Date): void
}>()

const format = 'yyyy-MM-dd HH:mm'
const mask = 'YYYY-MM-DD HH:mm'

const handleChange = (value: string | null) => {
  console.log(`handleChange(${JSON.stringify(value)})`)

  if (!value) return

  emit('update:model-value', LuxonDateTime.fromFormat(value, format).toJSDate())
}

const expanded = ref(false)

const formattedValue = computed(() => {
  return LuxonDateTime.fromJSDate(props.modelValue).toFormat(format)
})
</script>

<template>
  <div class="datetime-field">
    <q-card
      @click="expanded = true"
      flat
      bordered
      class="q-mb-md row"
      v-morph:a:datetime:150.tween="expanded ? 'b' : 'a'"
    >
      <q-btn
        @click="expanded = true"
        unelevated
        square
        color="primary"
        icon="las la-chevron-down"
      />

      <date-time class="q-ma-md" absolute :model-value="props.modelValue" />
    </q-card>

    <q-card flat bordered class="q-mb-md row" v-morph:b:datetime:150.tween="expanded ? 'b' : 'a'">
      <q-btn @click="expanded = false" unelevated square color="primary" icon="las la-chevron-up" />
      <q-date
        :model-value="formattedValue"
        :mask="mask"
        square
        @update:model-value="handleChange"
      />
      <q-time
        :model-value="formattedValue"
        :mask="mask"
        square
        format24h
        @update:model-value="handleChange"
      />
    </q-card>
  </div>
</template>
