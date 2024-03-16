<script lang="ts" setup>
const props = defineProps<{
  tooltip: string
}>()

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <q-btn v-bind="$attrs" @click.stop.prevent="emit('click')">
    <q-tooltip class="bg-black" anchor="top middle" self="center middle">
      {{ props.tooltip }}
    </q-tooltip>

    <slot />
  </q-btn>
</template>
