<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

import { useRouteParam } from 'src/lib/use-route-param'
import { graphql } from 'src/graphql/generated'

import backgroundXSBL from 'src/assets/background/jiroe-matia-rengel-b9kh72kOcdM-unsplash-xsbl.jpg?base64'

import TextEditor from 'src/components/text-editor/text-editor.vue'
import SingleImageUploadField from 'src/components/form/single-image-upload-field.vue'
import DndList from 'src/components/dnd-list/dnd-list.vue'

import { FormFieldKind } from 'src/graphql/generated/graphql'
import FormField from 'src/components/form/form-field.vue'

const id = useRouteParam('id')

const query = useQuery(
  graphql(`
    query EditTemplate($id: ID!) {
      template(where: { id: $id }) {
        id
        name
        banner
        description
        fields
      }
    }
  `),
  { id },
  { prefetch: false }
)

// const mutation = useMutation(
//   graphql(`
//     mutation UpdateTemplate($where: UpdateTemplateWhereInput!, $data: UpdateTemplateDataInput!) {
//       updateTemplate(where: $where, data: $data) {
//         id
//         name
//         banner
//         description
//         fields
//       }
//     }
//   `),
//   {}
// )

const template = computed(() => {
  return query.result.value?.template
})

const image = ref(null)

const dndOptions = Object.values(FormFieldKind).map((option) => ({
  value: option,
  label: option,
}))
</script>

<template>
  <q-card flat>
    <q-card-section>
      <div v-if="query.loading && !template">
        <q-skeleton type="QInput" />
      </div>

      <q-form v-else-if="template" class="column">
        <q-card flat bordered class="q-mb-md">
          <q-img
            :src="template.banner || `https://picsum.photos/seed/${template.id}/1280/212.jpg`"
            :placeholder-src="backgroundXSBL"
            height="212px"
            fit="cover"
          />

          <single-image-upload-field v-model="image" />
        </q-card>

        <q-card flat bordered class="q-mb-md">
          <q-input borderless :model-value="template.name" label="Name" class="q-px-md" />
        </q-card>

        <text-editor :model-value="template.description" class="q-mb-md" />

        <code> Fields: {{ template.fields.join(', ') }} </code>

        <q-card flat class="row justify-between overflow-hidden">
          <dnd-list
            :model-value="template.fields"
            :options="dndOptions"
            :target-props="{ class: 'col' }"
          >
            <template #source-item="{ element }">
              <q-card flat class="q-pa-sm q-ma-sm col">
                <form-field :kind="element.value" disable />
              </q-card>
            </template>

            <template #target-item="{ element }">
              <q-card flat class="q-pa-sm q-ma-sm col">
                <form-field :kind="element.value" disable />
              </q-card>
            </template>
          </dnd-list>
        </q-card>
      </q-form>
    </q-card-section>
  </q-card>
</template>
