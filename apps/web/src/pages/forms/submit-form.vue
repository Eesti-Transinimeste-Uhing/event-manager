<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'

import { graphql } from 'src/graphql/generated'
import { useRouteParam } from 'src/lib/use-route-param'

const handleSubmit = () => {
  return
}

const id = useRouteParam('id')

const { result, loading, error } = useQuery(
  graphql(`
    query FormSubmit($where: WhereIdInput!) {
      form(where: $where) {
        id
        name
        template {
          id
          fields
        }
      }
    }
  `),
  { where: { id } },
  { prefetch: false }
)
</script>

<template>
  <div class="column items-center">
    <q-form @submit="handleSubmit">
      {{ result }}
    </q-form>
  </div>
</template>
