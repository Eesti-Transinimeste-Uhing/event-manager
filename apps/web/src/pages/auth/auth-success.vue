<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from 'src/graphql/generated'
import { authFailure, dashboard } from 'src/router/routes'
import { useI18n } from 'src/hooks/use-i18n'

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
  { prefetch: false, fetchPolicy: 'network-only' }
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

const { t } = useI18n()

onMounted(() => {
  failTimeout = setTimeout(() => {
    router.push({
      name: authFailure.name,
      query: {
        message: t('session-acquire-timeout'),
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
        message: t('auth-no-roles'),
      },
    })
  }

  await router.push(dashboard)
})
</script>

<template>
  <q-card class="fixed-center card">
    <q-card-section>
      <div class="text-h5">{{ $t('securing-session') }}</div>
      <div class="text-subtitle2">{{ $t('please-wait') }}</div>
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
