<script lang="ts" setup>
// import { graphql } from 'src/graphql/generated'
// import { useCursorPagination } from 'src/hooks/use-cursor-pagination'
// import { computed, ref } from 'vue'

// const { result, filterText, loading } = useCursorPagination(
//   'templates',
//   graphql(`
//     query SearchTemplates(
//       $filter: [PaginationFilter!]
//       $first: Int
//       $after: String
//       $before: String
//       $last: Int
//       $sort: [PaginationSorting!]
//     ) {
//       templates(
//         filter: $filter
//         first: $first
//         after: $after
//         before: $before
//         last: $last
//         sort: $sort
//       ) {
//         pageInfo {
//           endCursor
//           startCursor
//           hasNextPage
//           hasPreviousPage
//           totalCount
//         }
//         edges {
//           node {
//             id
//             name
//           }
//         }
//       }
//     }
//   `),
//   {
//     defaultFilterColumns: ['name'],
//     defaultSortColumns: ['name'],
//   }
// )

// const model = ref(null)

// const options = computed(() => {
//   return (
//     result.value?.templates.edges.map((edge) => ({
//       value: edge.node.id,
//       label: edge.node.name,
//     })) ?? []
//   )
// })

import ButtonSelect from 'components/button-select.vue'
import { SelectOption } from 'src/components/form/base/select-field.vue'

const options: SelectOption[] = [
  {
    label: 'Asd',
    value: 'asd',
  },
  {
    label: 'Qwe',
    value: 'qwe',
  },
]
</script>

<style lang="scss" scoped></style>

<template>
  <!-- <q-select
    borderless
    v-model="model"
    use-input
    hide-selected
    fill-input
    label="Lazy filter"
    :options="options"
    @input-value="(v) => (filterText = v)"
    :input-debounce="300"
    :loading="loading"
    dropdown-icon="las la-caret-down"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select> -->

  <button-select :model-value="null" :options="options" color="primary" />
</template>
