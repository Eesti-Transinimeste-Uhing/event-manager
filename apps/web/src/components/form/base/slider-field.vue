<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: number | null
  class?: string
  min?: number
  max?: number
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: number | null): void
}>()

const handleInput = (v: string | number | null) => {
  if (!v) {
    emit('update:model-value', null)
    return
  }

  const result = typeof v === 'string' ? Number.parseInt(v, 10) : v

  emit('update:model-value', result)
}

const labelAlways = ref(false)
const labelTimeout = ref<NodeJS.Timeout | null>(null)

watch(
  () => props.modelValue,
  () => {
    if (labelTimeout.value) {
      clearTimeout(labelTimeout.value)
    } else {
      labelAlways.value = true
    }

    labelTimeout.value = setTimeout(() => {
      labelAlways.value = false
      labelTimeout.value = null
    }, 2500)
  }
)

onBeforeUnmount(() => {
  if (labelTimeout.value) {
    clearTimeout(labelTimeout.value)
  }
})

const handleIncrement = () => {
  emit('update:model-value', (props.modelValue ?? 0) + 1)
}

const handleDecrement = () => {
  emit('update:model-value', (props.modelValue ?? 0) - 1)
}
</script>

<template>
  <q-card flat bordered :class="props.class">
    <q-field v-bind="$attrs" stack-label borderless hide-bottom-space class="q-px-md">
      <template v-slot:control>
        <div class="row q-mr-md q-pt-sm items-center justify-center">
          <q-btn size="sm" color="primary" round label="-" @click="handleDecrement"></q-btn>
        </div>

        <q-slider
          class="col justify-center"
          v-bind="$attrs"
          :markers="5"
          label
          :label-always="labelAlways"
          :min="props.min"
          :max="props.max"
          :model-value="props.modelValue"
          @update:model-value="handleInput"
          snap
        />

        <div class="row q-ml-md items-center justify-center">
          <q-btn size="sm" color="primary" round label="+" @click="handleIncrement"></q-btn>
        </div>
      </template>
    </q-field>
  </q-card>
</template>
