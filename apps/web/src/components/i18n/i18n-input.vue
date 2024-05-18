<script lang="ts" setup>
import ComponentTranslator from 'src/components/component-translator.vue'
import { SupportedLanguages } from 'src/graphql/generated/graphql'
import { ref } from 'vue'

const props = defineProps<{
  modelValue: Record<SupportedLanguages, string>
  class?: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: Record<SupportedLanguages, string>): void
}>()

const lang = ref<SupportedLanguages>(SupportedLanguages.EtEe)

const handleUpdate = (newValue: string | number | null) => {
  emit('update:model-value', {
    ...props.modelValue,
    [lang.value]: newValue,
  })
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="component-translator" :class="props.class">
    <component-translator @update:model-value="(v) => (lang = v)">
      <q-card flat bordered>
        <q-input
          v-bind="$attrs"
          borderless
          :model-value="props.modelValue[lang]"
          @update:model-value="handleUpdate"
        >
          <template v-slot:prepend> <span /> </template>
          <template v-slot:append> <span /> </template>
        </q-input>
      </q-card>
    </component-translator>
  </div>
</template>
