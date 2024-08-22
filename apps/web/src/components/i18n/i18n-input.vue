<script lang="ts" setup>
import ComponentTranslator from 'src/components/i18n/component-translator.vue'
import { SupportedLanguages } from 'src/graphql/generated/graphql'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: Record<SupportedLanguages, string>
    class?: string
    defaultLanguage?: SupportedLanguages
  }>(),
  {
    defaultLanguage: SupportedLanguages.EtEe,
  }
)

const emit = defineEmits<{
  (event: 'update:model-value', value: Record<SupportedLanguages, string>): void
}>()

const lang = ref<SupportedLanguages>(props.defaultLanguage)

const handleUpdate = (newValue: string | number | null) => {
  emit('update:model-value', {
    ...props.modelValue,
    [lang.value]: newValue,
  })
}
</script>

<style lang="scss" scoped>
.i18n-input-card {
  border-top-left-radius: 0;
}
</style>

<template>
  <div class="component-translator" :class="props.class">
    <component-translator
      @update:model-value="(v) => (lang = v)"
      :default-language="props.defaultLanguage"
    >
      <q-card flat bordered class="i18n-input-card">
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
