<script lang="ts" setup>
import { computed, ref } from 'vue'

import TextField from './text-field.vue'

export type Option = {
  label: string
  value: string
}

const props = defineProps<{
  modelValue: string
  options: Option[]
  hasOther?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const options = computed(() => {
  return props.hasOther ? [...props.options, { label: 'Other', value: 'other' }] : props.options
})

const otherValue = ref('')
</script>

<template>
  <q-select
    v-bind="$attrs"
    :model-value="props.modelValue"
    :options="options"
    borderless
    dropdown-icon="las la-caret-down"
    map-options
    @update:model-value="(v) => emit('update:model-value', v.value)"
  >
    <template #option="{ opt, itemProps }">
      <q-item
        v-bind="itemProps"
        v-if="opt.value === 'other' && props.modelValue === 'other'"
        @click.stop.prevent="emit('update:model-value', 'other')"
      >
        <text-field v-model="otherValue" label="Custom gender" />
      </q-item>

      <q-item v-else v-bind="itemProps" @click.stop.prevent="emit('update:model-value', opt.value)">
        <q-item-section>
          {{ opt.label }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
