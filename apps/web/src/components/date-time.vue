<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

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

const timer = ref<NodeJS.Timeout | null>(null)
const now = ref(DateTime.utc())

onMounted(() => {
  if (!dt.value) {
    return
  }

  const diff = now.value.diff(dt.value).as('minutes')

  if (diff >= 60) {
    return
  }

  const timerInterval = diff < 1 ? 1000 : 60_000

  timer.value = setInterval(() => {
    now.value = DateTime.utc()
  }, timerInterval)
})

onBeforeUnmount(() => {
  if (!timer.value) {
    return
  }

  clearInterval(timer.value)
})
</script>

<template>
  <span v-if="dt">
    <q-tooltip class="bg-black" :anchor="position" self="center middle">
      {{ dt.toLocaleString(DateTime.DATETIME_FULL) }}
    </q-tooltip>

    {{ dt.toRelative({ base: now }) }}
  </span>

  <span v-else>Invalid date</span>
</template>
