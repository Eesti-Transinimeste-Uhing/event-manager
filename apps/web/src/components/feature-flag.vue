<script lang="ts" setup>
import { useFlags } from 'src/hooks/use-flags'
import { computed } from 'vue'

const { flags } = useFlags()

const props = defineProps<{
  flag: string
}>()

const show = computed(() => {
  return flags.value[props.flag]?.enabled ?? false
})
</script>

<template>
  <slot v-if="show" />

  <slot v-else name="fallback" />
</template>
