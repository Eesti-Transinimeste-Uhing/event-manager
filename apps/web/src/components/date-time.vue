<script lang="ts" setup>
import { DateTime } from 'luxon'
import { useI18n } from 'src/hooks/use-i18n'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const { currentLanguageHyphen } = useI18n()

const props = withDefaults(
  defineProps<{
    modelValue: Date | DateTime | string | number
    absolute?: boolean
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
    return DateTime.fromISO(props.modelValue).setLocale(currentLanguageHyphen.value)
  }

  if (typeof props.modelValue === 'number') {
    return DateTime.fromMillis(props.modelValue).setLocale(currentLanguageHyphen.value)
  }

  if (Object.prototype.toString.call(props.modelValue) === '[object Date]') {
    return DateTime.fromJSDate(props.modelValue as Date).setLocale(currentLanguageHyphen.value)
  }

  if (props.modelValue instanceof DateTime) {
    return props.modelValue.setLocale(currentLanguageHyphen.value)
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
  <span v-if="dt" class="items-center flex">
    <q-tooltip class="bg-black" :anchor="position" self="center middle">
      {{
        props.absolute ? dt.toRelative({ base: now }) : dt.toLocaleString(DateTime.DATETIME_FULL)
      }}
    </q-tooltip>

    {{ props.absolute ? dt.toLocaleString(DateTime.DATETIME_FULL) : dt.toRelative({ base: now }) }}
  </span>

  <span v-else class="items-center flex">Invalid date</span>
</template>
