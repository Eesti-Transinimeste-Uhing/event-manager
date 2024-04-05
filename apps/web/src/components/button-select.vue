<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SelectOption } from './form/base/select-field.vue'
import TooltipButton from './tooltip-button.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | null
    options: SelectOption[]
    class?: string
    persistent?: boolean
    tooltip: string
    position?:
      | 'center'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right'
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
  }>(),
  {
    position: 'center',
  }
)

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const morphStates = {
  button: 'card',
  card: 'button',
} as const

const morphGroupModel = ref<keyof typeof morphStates>('button')

const displayOptions = computed(() => {
  return props.options.map((option) => ({
    value: typeof option === 'string' ? option : option.value,
    label: typeof option === 'string' ? option : option.label,
  }))
})

const setMorphState = (state: keyof typeof morphStates) => {
  morphGroupModel.value = state
}

const handleNextMorph = () => {
  setMorphState(morphStates[morphGroupModel.value])
}

const handleOptionClick = (option: SelectOption) => {
  if (!props.persistent) setMorphState('button')

  emit('update:model-value', typeof option === 'string' ? option : option.value)
}
</script>

<style lang="scss" scoped>
.morph-card {
  width: 350px;
  z-index: 2000;
  height: fit-content;
}

.morph-wrapper {
  height: 42px;
  width: 42px;

  max-width: 100%;
  max-height: 100%;
}

.tooltip-button {
  height: 100%;
}
</style>

<template>
  <div
    class="relative-position morph-wrapper"
    :class="props.class"
    v-click-outside="() => setMorphState('button')"
  >
    <tooltip-button
      v-morph:button:mygroup:200="morphGroupModel"
      class="absolute-top-left tooltip-button"
      @click="handleNextMorph"
      :tooltip="props.tooltip"
      v-bind="$attrs"
      size="md"
    />

    <q-no-ssr>
      <q-card
        v-morph:card:mygroup:200="morphGroupModel"
        class="morph-card text-no-wrap"
        :class="`absolute-${props.position}`"
      >
        <q-list>
          <slot name="prepend" />

          <q-item
            clickable
            v-for="option of displayOptions"
            :key="option.value"
            @click.stop="() => handleOptionClick(option)"
          >
            <q-item-section>{{ option.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-no-ssr>
  </div>
</template>
