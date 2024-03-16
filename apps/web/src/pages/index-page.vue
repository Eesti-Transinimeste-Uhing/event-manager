<script lang="ts" setup>
import TextEditor from 'components/form/text-editor/text-editor-field.vue'
import FileUploadField from 'components/form/single-image-upload-field.vue'

import { ref } from 'vue'

const content = ref('Hi!')
const image = ref(null)
</script>

<template>
  <div class="column">
    <text-editor v-model="content" />
    <file-upload-field v-model="image" />
  </div>
</template>
