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
  <div class="dnd-wrapper row justify-between">
    <q-card flat class="col-10">
      <q-list class="fit">
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
            <q-item>
              <div>{{ element.value }}</div>
            </q-item>
          </template>
        </vue-draggable>
      </q-list>
    </q-card>

    <q-card flat class="col-2">
      <q-list>
        <vue-draggable
          :model-value="props.options"
          item-key="index"
          :animation="150"
          :group="{ name: 'a', pull: pullFunction }"
          :sort="false"
        >
          <template #item="{ element }">
            <q-item v-ripple>
              <div>{{ element.value }}</div>
            </q-item>
          </template>
        </vue-draggable>
      </q-list>
    </q-card>
  </div>
</template>
