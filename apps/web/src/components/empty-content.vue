<script lang="ts" setup>
import { dashboard } from 'src/router/routes'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    icon?: string
    iconColour?: string
    title?: string
    content?: string
  }>(),
  {
    icon: 'las la-question-circle',
    iconColour: 'white',
    title: 'No Content',
  }
)

const router = useRouter()
</script>

<style lang="scss" scoped>
.empty-content {
  height: 768px;
  width: 512px;
}

.main-icon {
  font-size: 15rem;
}

.wrapper {
  margin: auto;
}
</style>

<template>
  <div class="row justify-center items-center wrapper">
    <div class="empty-content column items-center justify-center">
      <q-icon :name="props.icon" class="main-icon" :color="props.iconColour" />

      <h2 class="q-mb-md">{{ props.title }}</h2>

      <div v-if="props.content" class="text-body1 q-mb-md">
        {{ props.content }}
      </div>

      <div class="row q-mt-lg">
        <q-btn-group>
          <q-btn color="primary" label="Reload" icon="las la-redo-alt" href="" />
          <q-btn color="primary" label="Home" icon="las la-home" :to="dashboard" />
          <q-btn color="primary" label="Go back" icon="las la-undo" @click="router.back()" />
        </q-btn-group>
      </div>
    </div>
  </div>
</template>
