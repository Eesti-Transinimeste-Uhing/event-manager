<script lang="ts" setup>
import DragHint from 'components/drag-hint.vue'
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
  <q-card flat bordered class="row wrap justify-between">
    <div class="col-9">
      <q-skeleton style="height: 200px" />
    </div>

    <div class="col-1">
      <drag-hint :running="open" side="right">
        <q-card>
          <q-card-section> asd </q-card-section>
          <q-card-section> asd </q-card-section>
          <q-card-section> asd </q-card-section>
        </q-card>
      </drag-hint>
    </div>

    <div class="col-2">
      <q-skeleton style="height: 200px" />
    </div>

    <div class="col-12">
      <q-btn
        @click="() => (open ? (open = false) : (open = true))"
        color="primary"
        label="toggle"
      />
    </div>
  </q-card>
</template>
