<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { graphql } from 'src/graphql/generated'

const query = useQuery(
  graphql(`
    query TemplateList($first: Int) {
      templates(first: $first) {
        edges {
          cursor
          node {
            id
            banner
            description
            fields
          }
        }
      }
    }
  `),
  { first: 10 },
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
