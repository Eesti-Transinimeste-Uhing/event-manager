<script lang="ts" setup>
import DndList from 'components/dnd-list/dnd-list.vue'
import { FormFieldKind } from 'src/graphql/generated/graphql'
import { ref } from 'vue'

const options = Object.values(FormFieldKind).map((value, index) => ({
  value,
  index,
  label: FormFieldKind[value],
}))

const fields = ref([])
</script>

<template>
  <div class="row justify-between overflow-hidden">
    <dnd-list v-model="fields" :options="options" :target-props="{ class: 'col' }">
      <template #source-item="{ element, ...props }">
        <q-item v-bind="props" flat class="q-ma-sm">
          {{ element.value }}
        </q-item>
      </template>

      <template #target-item="{ element, ...props }">
        <q-item v-bind="props" flat class="q-ma-sm">
          {{ element.value }}
        </q-item>
      </template>
    </dnd-list>
  </div>
</template>
