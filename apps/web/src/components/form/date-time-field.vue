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

const expanded = ref(false)

const formattedValue = computed(() => {
  return LuxonDateTime.fromJSDate(props.modelValue)
    .setLocale(currentLanguageHyphen.value)
    .toFormat(format)
})
</script>

<template>
  <div class="datetime-field">
    <q-card
      @click="expanded = true"
      flat
      bordered
      class="q-mb-md row justify-between"
      v-morph:a:datetime:150.tween="expanded ? 'b' : 'a'"
    >
      <div class="column">
        <span class="text-caption text-grey q-px-md q-pt-sm">{{ props.label }}</span>
        <date-time class="q-mx-md q-mb-sm" absolute :model-value="props.modelValue" />
      </div>

      <div class="q-pa-sm">
        <q-btn
          @click="expanded = true"
          unelevated
          round
          color="primary"
          icon="las la-chevron-down"
        />
      </div>
    </q-card>

    <q-card flat bordered class="q-mb-md row" v-morph:b:datetime:150.tween="expanded ? 'b' : 'a'">
      <div class="col row">
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
      </div>

      <div class="column justify-center">
        <q-btn
          @click="expanded = false"
          unelevated
          round
          size="md"
          color="primary"
          icon="las la-chevron-up"
          class="q-ma-md"
        />
      </div>
    </q-card>
  </div>
</template>
