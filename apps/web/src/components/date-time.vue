<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: Date | DateTime | string | number
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

const dt = computed(() => {
  if (typeof props.modelValue === 'string') {
    return DateTime.fromISO(props.modelValue)
  }

  if (typeof props.modelValue === 'number') {
    return DateTime.fromMillis(props.modelValue)
  }

  if (Object.prototype.toString.call(props.modelValue) === '[object Date]') {
    return DateTime.fromJSDate(props.modelValue as Date)
  }

  if (props.modelValue instanceof DateTime) {
    return props.modelValue
  }

  return null
})
</script>

<template>
  <span v-if="dt">
    <q-tooltip class="bg-black" :anchor="position" self="center middle">
      {{ dt.toLocaleString(DateTime.DATETIME_FULL) }}
    </q-tooltip>

    {{ dt.toRelative() }}
  </span>

  <span v-else>Invalid date</span>
</template>
