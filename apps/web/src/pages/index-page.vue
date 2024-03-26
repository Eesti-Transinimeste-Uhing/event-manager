<script lang="ts" setup>
import { ref } from 'vue'

import NameField from 'components/form/name-field.vue'
import AgeField from 'components/form/age-field.vue'
import GenderField from 'components/form/gender-field.vue'

const name = ref('Brooke')
const age = ref(25)
const gender = ref('')
</script>

<template>
  <div>
    <name-field v-model="name" />
    <age-field v-model="age" />
    <gender-field v-model="gender" allow-other random-order />
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
