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
  <div class="column">
    <dnd-list v-model="fields" :options="options" />
  </div>
</template>
