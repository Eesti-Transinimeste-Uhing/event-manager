<script lang="ts" setup>
import { DateTime as LuxonDateTime } from 'luxon'
import { computed, ref } from 'vue'

import DateTime from '../date-time.vue'
import { useI18n } from 'src/hooks/use-i18n'

const { currentLanguageHyphen } = useI18n()

const props = defineProps<{
  modelValue: Date
  label: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: Date): void
}>()

const format = 'yyyy-MM-dd HH:mm'
const mask = 'YYYY-MM-DD HH:mm'

const handleChange = (value: string | null) => {
  if (!value) return

  emit('update:model-value', LuxonDateTime.fromFormat(value, format).toJSDate())
}

const modalOpen = ref(false)

const invalid = computed(() => {
  return !props.modelValue || isNaN(props.modelValue.getTime())
})

const formattedValue = computed(() => {
  return LuxonDateTime.fromJSDate(props.modelValue)
    .setLocale(currentLanguageHyphen.value)
    .toFormat(format)
})
</script>

<style lang="scss" scoped>
.date-time-controls {
  max-width: 100%;
}
</style>

<template>
  <q-card flat bordered class="datetime-field q-px-md q-mb-md" @click="modalOpen = true">
    <q-field borderless :label="props.label" :stack-label="!invalid">
      <template #control>
        <date-time v-if="!invalid" absolute :model-value="props.modelValue" />
      </template>
    </q-field>

    <q-dialog v-model="modalOpen">
      <q-card class="row no-wrap date-time-controls">
        <q-date
          flat
          :model-value="formattedValue"
          :mask="mask"
          square
          @update:model-value="handleChange"
        />
        <q-time
          flat
          :model-value="formattedValue"
          :mask="mask"
          square
          format24h
          @update:model-value="handleChange"
        />
      </q-card>
    </q-dialog>
  </q-card>
</template>
