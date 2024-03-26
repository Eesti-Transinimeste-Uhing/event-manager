<script lang="ts" setup>
import VueDraggable from 'vuedraggable'

type Option = {
  value: unknown
  label: string
}

const props = defineProps<{
  modelValue: unknown[]
  options: Option[]
  sourceProps?: object
  targetProps?: object
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: unknown[]): void
}>()

const pullFunction = () => {
  return 'clone'
}
</script>

<style lang="scss" scoped>
.source-item,
.target-item {
  cursor: grab;
}
</style>

<template>
  <vue-draggable
    :model-value="props.modelValue"
    @update:model-value="(v) => emit('update:model-value', v)"
    group="a"
    item-key="value"
    :animation="150"
    :component-data="props.targetProps"
  >
    <template #item="slotProps">
      <div class="target-item">
        <slot name="target-item" v-bind="slotProps" />
      </div>
    </template>
  </vue-draggable>

  <slot name="separator" />

  <vue-draggable
    :model-value="props.options"
    item-key="index"
    :animation="150"
    :group="{ name: 'a', pull: pullFunction }"
    :sort="false"
    :component-data="props.sourceProps"
  >
    <template #item="slotProps">
      <div class="source-item">
        <slot name="source-item" v-bind="slotProps" />
      </div>
    </template>
  </vue-draggable>
</template>
