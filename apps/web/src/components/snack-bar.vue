<script lang="ts" setup>
import { computed } from 'vue'
import { NotificationItem } from 'src/stores/notifications'

const props = defineProps<
  Omit<NotificationItem, 'id'> & {
    badge?: number
  }
>()

const emit = defineEmits<{
  (event: 'dismiss'): void
}>()

const iconColour = computed(() => {
  switch (props.type) {
    case 'error':
      return 'red'

    case 'info':
    default:
      return 'primary'

    case 'success':
      return 'green'

    case 'warning':
      return 'orange'
  }
})

const iconName = computed(() => {
  switch (props.type) {
    case 'error':
      return 'las la-times'

    case 'info':
    default:
      return 'las la-info'

    case 'success':
      return 'las la-check'

    case 'warning':
      return 'las la-exclamation'
  }
})
</script>

<style lang="scss" scoped>
.snack-bar {
  width: 24rem;
}

.count-badge {
  transform: translate(-50%, -50%);
}
</style>

<template>
  <q-banner inline-actions rounded class="snack-bar">
    <q-badge v-if="badge" color="red" rounded class="absolute-top-left count-badge">
      <span v-if="badge > 1">{{ badge }}</span>
    </q-badge>

    <div class="row items-center">
      <q-icon :color="iconColour" :name="iconName" size="sm" class="q-mr-md" />

      <div class="text-body1">
        {{ lines[0] }}
      </div>
    </div>

    <div v-if="lines.length === 2" class="row items-center q-my-sm">
      <span class="text-body2">{{ lines[1] }}</span>
    </div>

    <template #action>
      <q-btn v-if="dismissable" round flat icon="las la-times" @click="emit('dismiss')" />
    </template>
  </q-banner>
</template>
