<script lang="ts" setup>
import { computed, ref } from 'vue'

export type SelectOption =
  | string
  | {
      label: string
      value: string
    }

const props = defineProps<{
  modelValue: string | null
  options: SelectOption[]
  allowOther?: boolean
  randomOrder?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string | null): void
}>()

const appendOther = (options: SelectOption[]): SelectOption[] => {
  if (!props.allowOther) {
    return options
  }

  const otherOption =
    typeof props.options[0] === 'string' ? 'Other' : { label: 'Other', value: 'other' }

  return [...options, otherOption]
}

const options = computed(() => {
  if (!props.randomOrder) {
    return appendOther(props.options)
  }

  return appendOther(
    [...props.options].sort(() => {
      return Math.random() - 0.5
    })
  )
})

const touched = ref(false)

const isOther = computed(() => {
  if (!props.allowOther) {
    return false
  }

  const isUnrecognised = !props.options.some((option) => {
    if (typeof option === 'string') {
      return option === props.modelValue
    }

    return option.value === props.modelValue
  })

  if (isUnrecognised && touched.value) {
    return true
  }

  if (isUnrecognised && props.modelValue) {
    return true
  }

  return false
})

const handleInput = (v: SelectOption) => {
  if (!touched.value) touched.value = true

  const value = v && (typeof v === 'string' ? v : v.value)

  if (value === 'other') {
    emit('update:model-value', '')
    return
  }

  emit('update:model-value', value)
}

const handleClear = () => {
  touched.value = false
  emit('update:model-value', null)
}
</script>

<template>
  <transition name="card" mode="out-in">
    <q-select
      v-if="!allowOther || !isOther"
      v-bind="$attrs"
      :model-value="props.modelValue"
      :options="options"
      borderless
      dropdown-icon="las la-caret-down"
      map-options
      @update:model-value="(v) => handleInput(v)"
      clear-icon="las la-times"
      @clear="handleClear"
      no-error-icon
      hide-bottom-space
      class="q-pr-sm"
    ></q-select>

    <q-input
      v-else
      v-bind="$attrs"
      borderless
      :model-value="props.modelValue"
      @update:model-value="(v) => v && handleInput(String(v))"
      clearable
      @clear="handleClear"
      clear-icon="las la-times"
      no-error-icon
      hide-bottom-space
      class="q-pr-sm"
    ></q-input>
  </transition>
</template>
