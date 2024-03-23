<script lang="ts" setup>
const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: number): void
}>()

const handleInput = (v: string | number | null) => {
  if (!v) {
    emit('update:model-value', 0)
    return
  }

  const result = typeof v === 'string' ? Number.parseInt(v, 10) : v

  emit('update:model-value', result)
}

const handleIncrement = () => {
  emit('update:model-value', props.modelValue + 1)
}

const handleDecrement = () => {
  emit('update:model-value', props.modelValue - 1)
}
</script>

<template>
  <q-input
    borderless
    v-bind="$attrs"
    :model-value="props.modelValue"
    @update:model-value="handleInput"
  >
    <template v-slot:append>
      <q-btn-group flat class="rotate-90">
        <q-btn size="small" icon="las la-caret-left" class="q-pa-none" @click="handleIncrement" />
        <q-btn size="small" icon="las la-caret-right" class="q-pa-none" @click="handleDecrement" />
      </q-btn-group>
    </template>
  </q-input>
</template>
