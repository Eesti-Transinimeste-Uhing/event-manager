<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from 'src/graphql/generated'

const router = useRouter()

const { onResult, onError } = useQuery(
  graphql(`
    query PostOauthViewer {
      viewer {
        id
      }
    }
  `),
  {},
  { prefetch: false }
)

onError((error) => {
  const errors = [
    ...error.graphQLErrors.map((graphqlError) => graphqlError.message),
    error.networkError?.message,
  ].filter(Boolean)

  router.push(`/auth/discord/failure?message=${encodeURIComponent(errors.join('\n'))}`)
})

let failTimeout: NodeJS.Timeout | null = null

onMounted(() => {
  failTimeout = setTimeout(() => {
    router.push('/auth/discord/failure?message=Timeout')
  }, 5000)
})

onBeforeUnmount(() => {
  if (failTimeout) clearTimeout(failTimeout)
})

onResult((result) => {
  console.log('result:', result.data)
})
</script>

<template>
  <q-card class="fixed-center card">
    <q-card-section>
      <div class="text-h5">Securing your session...</div>
      <div class="text-subtitle2">Please wait</div>
    </q-card-section>

    <q-linear-progress indeterminate />
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 350px;
}
</style>
