<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    tooltip: string
    position?:
      | 'top middle'
      | 'top left'
      | 'top right'
      | 'top start'
      | 'top end'
      | 'center left'
      | 'center middle'
      | 'center right'
      | 'center start'
      | 'center end'
      | 'bottom left'
      | 'bottom middle'
      | 'bottom right'
      | 'bottom start'
      | 'bottom end'
  }>(),
  {
    position: 'top middle',
  }
)

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <q-btn v-bind="$attrs" @click.stop.prevent="emit('click')">
    <q-tooltip class="bg-black" :anchor="position" self="center middle">
      {{ props.tooltip }}
    </q-tooltip>

    <slot />
  </q-btn>
</template>
