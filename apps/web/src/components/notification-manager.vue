<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useNotificationsStore } from 'src/stores/notifications'
import SnackBar from './snack-bar.vue'

const store = useNotificationsStore()
const { next, queue } = storeToRefs(store)

const handleDismiss = (id: number) => {
  store.dequeue(id)
}

const timeout = ref<NodeJS.Timeout | null>(null)

store.$subscribe((mutation, state) => {
  if (state.queue.length === 0) {
    return
  }

  if (timeout.value) {
    clearTimeout(timeout.value)
  }

  timeout.value = setTimeout(() => {
    const next = state.queue.at(0)

    if (next) store.dequeue(next.id)
  }, 5_000)
})

onBeforeUnmount(() => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
})
</script>

<template>
  <div class="fixed-bottom-right q-ma-md">
    <transition name="notification" mode="out-in">
      <snack-bar
        v-if="next"
        :key="next.id"
        v-bind="next"
        @dismiss="handleDismiss(next.id)"
        :badge="queue.length - 1"
      />
    </transition>
  </div>
</template>
