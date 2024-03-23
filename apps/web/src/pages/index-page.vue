<script lang="ts" setup>
import NameField from 'components/form/name-field.vue'
import AgeField from 'components/form/age-field.vue'
import { ref } from 'vue'

const name = ref('Brooke')
const age = ref(25)
</script>

<template>
  <div>
    <name-field v-model="name" />
    <age-field v-model="age" />
  </div>

  <!-- <div class="row justify-between overflow-hidden">
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
  </div> -->
</template>
