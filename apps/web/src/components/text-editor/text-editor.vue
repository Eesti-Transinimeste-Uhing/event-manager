<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, watch } from 'vue'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Heading from '@tiptap/extension-heading'
import HardBreak from '@tiptap/extension-hard-break'

import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'

import History from '@tiptap/extension-history'

import EditorToolbar from './editor-toolbar.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    Document,
    Paragraph,
    Text,
    OrderedList,
    BulletList,
    ListItem,
    HorizontalRule,
    Heading,
    HardBreak,
    Bold,
    Italic,
    Underline,
    History,
  ],
  onUpdate() {
    if (!editor.value) {
      return
    }

    emit('update:modelValue', editor.value.getHTML())
  },
})

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) {
      return
    }

    if (editor.value.getHTML() === value) {
      return
    }

    editor.value.commands.setContent(value, false)
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss" scoped>
:deep(.tiptap),
.tiptap {
  min-height: 15rem;
  height: 100%;
  padding: 1rem;
}

:deep(.ProseMirror-focused) {
  outline: none;
}

.editor-content {
  height: 15rem;
}
</style>

<template>
  <q-card flat bordered>
    <q-no-ssr>
      <editor-toolbar
        key="real"
        @bold="editor?.chain().focus().toggleBold().run()"
        @italic="editor?.chain().focus().toggleItalic().run()"
        @underline="editor?.chain().focus().toggleUnderline().run()"
        @undo="editor?.chain().focus().undo().run()"
        @redo="editor?.chain().focus().redo().run()"
        :can-undo="editor?.can().undo() ?? false"
        :can-redo="editor?.can().redo() ?? false"
      />

      <q-separator />

      <q-scroll-area class="editor-content">
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
