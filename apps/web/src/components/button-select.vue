<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SelectOption } from './form/base/select-field.vue'

const props = defineProps<{
  modelValue: string | null
  options: SelectOption[]
  class?: string
  persistent?: boolean
}>()

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
  top: 2rem;
}

.morph-wrapper {
  display: contents;
}
</style>

<template>
  <div class="morph-wrapper" v-click-outside="() => setMorphState('button')">
    <q-btn
      v-morph:button:mygroup:200.resize="morphGroupModel"
      :class="props.class"
      @click.stop="handleNextMorph"
      v-bind="$attrs"
    />

    <q-no-ssr>
      <q-card
        v-morph:card:mygroup:200.resize="morphGroupModel"
        class="morph-card text-no-wrap absolute"
        :class="props.class"
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
