<script lang="ts" setup>
import TextEditor from 'components/text-editor/text-editor.vue'
import { ref } from 'vue'

const content = ref('Hi!')
</script>

<template>
  <div class="column">
    <text-editor v-model="content" />
  </div>
</template>
