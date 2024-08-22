<script lang="ts" setup>
import { ref } from 'vue'
import { JSONContent } from '@tiptap/vue-3'
import ComponentTranslator from 'src/components/i18n/component-translator.vue'
import { SupportedLanguages } from 'src/graphql/generated/graphql'
import TextEditor from '../text-editor/text-editor.vue'

const props = withDefaults(
  defineProps<{
    modelValue: Record<SupportedLanguages, JSONContent | null>
    defaultLanguage?: SupportedLanguages
  }>(),
  {
    defaultLanguage: SupportedLanguages.EtEe,
  }
)

const emit = defineEmits<{
  (event: 'update:model-value', value: Record<SupportedLanguages, JSONContent | null>): void
}>()

const lang = ref<SupportedLanguages>(props.defaultLanguage)

const handleUpdate = (newValue: JSONContent | null) => {
  emit('update:model-value', {
    ...props.modelValue,
    [lang.value]: newValue,
  })
}
</script>

<template>
  <component-translator
    @update:model-value="(v) => (lang = v)"
    :default-language="props.defaultLanguage"
  >
    <template
      v-slot:[language]
      v-for="language in Object.values(SupportedLanguages)"
      :key="language"
    >
      <q-card flat bordered>
        <text-editor
          v-bind="$attrs"
          borderless
          :model-value="props.modelValue[language]"
          @update:model-value="handleUpdate"
        />
      </q-card>
    </template>
  </component-translator>
</template>
