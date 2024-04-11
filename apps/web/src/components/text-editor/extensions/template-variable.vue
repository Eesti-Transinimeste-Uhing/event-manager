<script lang="ts" setup>
import { NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed } from 'vue'
import { TemplateVariableId } from './template-variable'

const props = defineProps<NodeViewProps>()

const label = computed(
  () => TemplateVariableId[props.node.attrs.id as keyof typeof TemplateVariableId] || '<unknown>'
)
</script>

<style lang="scss" scoped>
.template-variable {
  &-wrapper {
    user-select: none;
  }
}
</style>

<template>
  <node-view-wrapper as="span" class="template-variable-wrapper">
    <q-badge color="secondary">
      <q-icon name="las la-code" class="q-mr-xs" />
      {{ $t(label) }}
    </q-badge>
  </node-view-wrapper>
</template>
