<script lang="ts" setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import { Ref, computed, ref } from 'vue'
import VueDraggable from 'vuedraggable'
import { DateTime } from 'luxon'
import bytes from 'bytes'

import { useRouteParam } from 'src/lib/use-route-param'
import { graphql } from 'src/graphql/generated'

import TextEditor from 'src/components/text-editor/text-editor.vue'
import SingleImageUploadField from 'src/components/form/single-image-upload-field.vue'
import FormField from 'src/components/form/form-field.vue'
import DragHint from 'src/components/drag-hint.vue'

import { FormFieldKind } from 'src/graphql/generated/graphql'
import { useFilePreview } from 'src/hooks/use-file-preview'
import TooltipButton from 'src/components/tooltip-button.vue'
import SingleImagePreviewDialog from 'src/components/form/single-image-preview-dialog.vue'

const id = useRouteParam('id')

const query = useQuery(
  graphql(`
    query EditTemplate($id: ID!) {
      template(where: { id: $id }) {
        id
        updatedAt
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

const updateTemplate = useMutation(
  graphql(`
    mutation UpdateTemplate($where: UpdateTemplateWhereInput!, $data: UpdateTemplateDataInput!) {
      updateTemplate(where: $where, data: $data) {
        id
      }
    }
  `)
)

const handleSave = async () => {
  await updateTemplate.mutate({
    where: {
      id,
    },
    data: {
      banner: typeof banner.value === 'string' ? null : banner.value,
      name: name.value,
      description: description.value,
      fields: fields.value.map((field) => field.value),
    },
  })

  await query.refetch()
}

const template = computed(() => {
  return query.result.value?.template
})

const formFieldKinds: Ref<Array<{ value: FormFieldKind }>> = ref([])

const bannerFile = ref<File | null>(null)
const bannerUrl = ref<string | null>(null)

const banner = computed(() => {
  if (bannerFile.value) {
    return bannerFile.value
  }

  return bannerUrl.value
})

const topOffset = ref(0)
const name = ref('')
const description = ref('')
const fields = ref<Array<{ value: FormFieldKind }>>([])

query.onResult((result) => {
  const template = result.data?.template

  if (!template) {
    return
  }

  bannerFile.value = null
  bannerUrl.value = `${template.banner}/${DateTime.fromISO(template.updatedAt).toUnixInteger()}`
  name.value = template.name
  description.value = template.description
  fields.value = template.fields.map((field) => ({ value: field }))
  formFieldKinds.value = Object.values(FormFieldKind)
    .filter((kind) => {
      return !fields.value.some((existingKind) => existingKind.value === kind)
    })
    .map((kind) => ({ value: kind }))
})

const draggingLeft = ref(false)
const draggingRight = ref(false)

const { preview, size, dimensions, ratio } = useFilePreview(banner)

const adjustOpen = ref(false)
</script>

<style lang="scss" scoped>
.source-item,
.target-item {
  :deep(.q-field__inner) {
    cursor: grab;
  }

  cursor: grab;
}

.adjuster-wrapper {
  transition-property: opacity, height;
  transition-duration: 0.2s;
  transition-timing-function: $in-out-bezier;

  opacity: 0;
  height: 500px;

  &.open {
    opacity: 1;
    height: 500px;
  }
}
</style>

<template>
  <q-card flat>
    <single-image-preview-dialog
      :open="adjustOpen"
      @close="adjustOpen = false"
      v-model="topOffset"
      :label="name"
      :caption="size ? bytes(size) : null"
      :preview="preview"
      :width="dimensions[0]"
      :height="dimensions[1]"
      :ratio="ratio"
    />

    <q-card-actions align="right">
      <q-btn
        label="save"
        color="primary"
        :loading="updateTemplate.loading.value"
        icon="las la-save"
        @click="handleSave"
      />
    </q-card-actions>

    <q-separator />

    <q-card-section>
      <div v-if="query.loading && !template">
        <q-skeleton type="QInput" />
      </div>

      <q-form v-else-if="template" class="column">
        <q-card flat bordered class="q-mb-md">
          <single-image-upload-field
            :model-value="banner"
            @update:model-value="(v) => (bannerFile = v)"
          >
            <template #prepend>
              <tooltip-button flat tooltip="Enlarge" round>
                <q-avatar>
                  <q-img
                    :ratio="1"
                    height="40px"
                    width="40px"
                    fit="contain"
                    :src="preview"
                    @click="adjustOpen = true"
                  />
                </q-avatar>
              </tooltip-button>
            </template>
          </single-image-upload-field>
        </q-card>

        <q-card flat bordered class="q-mb-md">
          <q-input borderless v-model="name" label="Name" class="q-px-md" />
        </q-card>

        <text-editor v-model="description" class="q-mb-md" />

        <q-card flat class="row q-col-gutter-sm justify-between overflow-hidden">
          <div class="col-8">
            <drag-hint :running="draggingLeft" side="right">
              <vue-draggable
                v-model="fields"
                group="a"
                item-key="value"
                :animation="150"
                :component-data="{ class: 'col fit' }"
                @start="draggingRight = true"
                @end="draggingRight = false"
              >
                <template #item="{ element }">
                  <div class="target-item">
                    <q-card flat bordered class="q-px-md q-mb-sm">
                      <form-field :kind="element.value" disable />
                    </q-card>
                  </div>
                </template>
              </vue-draggable>
            </drag-hint>
          </div>

          <div class="col-4">
            <drag-hint :running="draggingRight" side="left">
              <vue-draggable
                v-model="formFieldKinds"
                item-key="value"
                :animation="150"
                group="a"
                :sort="false"
                :component-data="{ class: 'fit' }"
                @start="draggingLeft = true"
                @end="draggingLeft = false"
              >
                <template #item="{ element }">
                  <div class="source-item col-4">
                    <q-card flat bordered class="q-px-md q-mb-sm">
                      <form-field :kind="element.value" disable />
                    </q-card>
                  </div>
                </template>
              </vue-draggable>
            </drag-hint>
          </div>
        </q-card>
      </q-form>
    </q-card-section>
  </q-card>
</template>
