<script lang="ts" setup>
import VueDraggable from 'vuedraggable'

type Option = {
  value: unknown
  label: string
}

const props = defineProps<{
  modelValue: unknown[]
  options: Option[]
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: unknown[]): void
}>()

const pullFunction = () => {
  return 'clone'
}
</script>

<template>
  <vue-draggable
    :model-value="props.modelValue"
    @update:model-value="(v) => emit('update:model-value', v)"
    group="a"
    item-key="value"
    :animation="150"
    :component-data="{
      class: 'fit',
    }"
  >
    <template #item="{ element }">
      <slot name="target-item" v-bind="element">
        <div>{{ element }}</div>
      </slot>
    </template>
  </vue-draggable>

  <vue-draggable
    :model-value="props.options"
    item-key="index"
    :animation="150"
    :group="{ name: 'a', pull: pullFunction }"
    :sort="false"
  >
    <template #item="{ element }">
      <slot name="source-item" v-bind="element">
        <div>{{ element }}</div>
      </slot>
    </template>
  </vue-draggable>
</template>
