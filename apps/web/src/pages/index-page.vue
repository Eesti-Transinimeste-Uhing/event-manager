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
  <div class="row justify-between">
    <q-list>
      <dnd-list v-model="fields" :options="options">
        <template #source-item="item">
          <q-item flat class="q-ma-sm">
            {{ item.value }}
          </q-item>
        </template>

        <template #target-item="item">
          <q-item flat class="q-ma-sm">
            {{ item.value }}
          </q-item>
        </template>
      </dnd-list>
    </q-list>
  </div>
</template>
