<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { useRouteParam } from 'src/lib/use-route-param'

import { graphql } from 'src/graphql/generated'

const id = useRouteParam('id')

const query = useQuery(
  graphql(`
    query EditTemplate($id: ID!) {
      template(where: { id: $id }) {
        id
      }
    }
  `),
  { id },
  { prefetch: false }
)
</script>

<template>
  <q-card>
    <q-card-section>
      <code>{{ query.result }}</code>
    </q-card-section>
  </q-card>
</template>
