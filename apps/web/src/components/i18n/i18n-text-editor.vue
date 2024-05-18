<script lang="ts" setup>
import { ref } from 'vue'
import { JSONContent } from '@tiptap/vue-3'
import ComponentTranslator from 'src/components/component-translator.vue'
import { SupportedLanguages } from 'src/graphql/generated/graphql'
import TextEditor from '../text-editor/text-editor.vue'

const props = defineProps<{
  modelValue: Record<SupportedLanguages, JSONContent | null>
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: Record<SupportedLanguages, JSONContent | null>): void
}>()

const lang = ref<SupportedLanguages>(SupportedLanguages.EtEe)

const handleUpdate = (newValue: JSONContent | null) => {
  emit('update:model-value', {
    ...props.modelValue,
    [lang.value]: newValue,
  })
}
</script>

<template>
  <component-translator @update:model-value="(v) => (lang = v)">
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
