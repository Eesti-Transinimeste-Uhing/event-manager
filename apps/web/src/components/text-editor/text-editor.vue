<script lang="ts" setup>
import { useEditor, EditorContent, JSONContent } from '@tiptap/vue-3'
import { onBeforeUnmount, watch } from 'vue'
import { extensions, TemplateVariableId } from '@etu/tiptap'

import { TemplateVariableNodeWithRenderer } from './extensions/template-variable'

import EditorToolbar from './editor-toolbar.vue'

const props = defineProps<{
  modelValue: JSONContent | null
  borderless?: boolean
  readonly?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: JSONContent): void
}>()

const editor = useEditor({
  content: props.modelValue,
  editable: !props.readonly,
  extensions: [...extensions, TemplateVariableNodeWithRenderer],
  onUpdate() {
    if (!editor.value) {
      return
    }

    emit('update:modelValue', editor.value.getJSON())
  },
})

const handleTemplateVariable = (id: keyof typeof TemplateVariableId) => {
  if (!editor.value) return

  editor.value
    .chain()
    .focus()
    .insertContent({ type: TemplateVariableNodeWithRenderer.name, attrs: { id } })
    .run()
}

watch(
  () => props.modelValue,
  (value) => {
    editor.value?.commands.setContent(value, false)
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss" scoped>
:deep(.tiptap),
.tiptap {
  height: 100%;
}

:deep(.ProseMirror-focused) {
  outline: none;
}

.editor-content {
  height: 15rem;
}
</style>

<template>
  <q-no-ssr v-if="readonly">
    <editor-content :editor="editor" />
  </q-no-ssr>

  <q-card v-else flat :bordered="!props.borderless">
    <q-no-ssr>
      <editor-toolbar
        key="real"
        @bold="editor?.chain().focus().toggleBold().run()"
        @italic="editor?.chain().focus().toggleItalic().run()"
        @undo="editor?.chain().focus().undo().run()"
        @redo="editor?.chain().focus().redo().run()"
        @template-variable="handleTemplateVariable"
        :bold="editor?.isActive('bold') ?? false"
        :italic="editor?.isActive('italic') ?? false"
        :can-undo="editor?.can().undo() ?? false"
        :can-redo="editor?.can().redo() ?? false"
      />

      <q-separator />

      <q-scroll-area class="editor-content q-ma-md">
        <editor-content :editor="editor" />
      </q-scroll-area>

      <template v-slot:placeholder>
        <q-card flat>
          <q-skeleton type="QBtn" style="width: 100%" />
        </q-card>

        <q-separator />

        <div class="editor">
          <div class="tiptap"></div>
        </div>
      </template>
    </q-no-ssr>
  </q-card>
</template>
