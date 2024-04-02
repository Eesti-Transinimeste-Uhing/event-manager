<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from 'src/graphql/generated'
import { authFailure, dashboard } from 'src/router/routes'

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
  { prefetch: false, fetchPolicy: 'cache-first' }
)

onError((error) => {
  const errors = [
    ...error.graphQLErrors.map((graphqlError) => graphqlError.message),
    error.networkError?.message,
  ].filter(Boolean)

  router.push({
    name: authFailure.name,
    query: {
      message: errors.join('\n'),
    },
  })
})

let failTimeout: NodeJS.Timeout | null = null

onMounted(() => {
  failTimeout = setTimeout(() => {
    router.push({
      name: authFailure.name,
      query: {
        message: 'Timed out waiting for the session to initialise, please try again.',
      },
    })
  }, 10_000)
})

onBeforeUnmount(() => {
  if (failTimeout) clearTimeout(failTimeout)
})

onResult(async (result) => {
  if (result.data && !result.data.viewer) {
    return router.push({
      name: authFailure.name,
      query: {
        message: "You either aren't registered, or you don't have permission to view this page.",
      },
    })
  }

  await router.push(dashboard)
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
