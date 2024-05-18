<script lang="ts" setup>
import { computed } from 'vue'
import { SelectOption } from './form/base/select-field.vue'
import TooltipButton from './tooltip-button.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | null
    options: SelectOption[]
    class?: string
    tooltip: string
    position?:
      | 'center'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right'
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
  }>(),
  {
    position: 'center',
  }
)

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const displayOptions = computed(() => {
  return props.options.map((option) => ({
    value: typeof option === 'string' ? option : option.value,
    label: typeof option === 'string' ? option : option.label,
  }))
})

const handleOptionClick = (option: SelectOption) => {
  emit('update:model-value', typeof option === 'string' ? option : option.value)
}
</script>

<template>
  <div :class="props.class">
    <tooltip-button :tooltip="props.tooltip" v-bind="$attrs" size="md">
      <q-menu cover anchor="top right">
        <slot name="prepend" />

        <q-item
          clickable
          v-for="option of displayOptions"
          :key="option.value"
          @click="() => handleOptionClick(option)"
        >
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-menu>
    </tooltip-button>
  </div>
</template>
