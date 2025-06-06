<script lang="ts" setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import { Ref, computed, ref } from 'vue'
import VueDraggable from 'vuedraggable'
import bytes from 'bytes'
import { JSONContent } from '@tiptap/core'

import { useRouteQuery } from 'src/lib/use-route-param'
import { graphql } from 'src/graphql/generated'

import SingleImageUploadField from 'src/components/form/single-image-upload-field.vue'
import FormField from 'src/components/form/form-field.vue'
import DragHint from 'src/components/drag-hint.vue'
import EmptyContent from 'src/components/empty-content.vue'
import SubmissionLimitField from 'src/components/form/submission-limit-field.vue'

import { FormFieldKind, SupportedLanguages } from 'src/graphql/generated/graphql'
import { useFilePreview } from 'src/hooks/use-file-preview'
import TooltipButton from 'src/components/tooltip-button.vue'
import SingleImagePreviewDialog from 'src/components/form/single-image-preview-dialog.vue'
import { useNotificationsStore } from 'src/stores/notifications'
import { useI18n } from 'src/hooks/use-i18n'
import I18nInput from 'src/components/i18n/i18n-input.vue'
import I18nTextEditor from 'src/components/i18n/i18n-text-editor.vue'

const id = useRouteQuery('id')

const variables = computed(() => {
  return { id }
})

const { result, loading, error, refetch, onResult } = useQuery(
  graphql(`
    query EditTemplate($id: ID!) {
      template(where: { id: $id }) {
        id
        updatedAt
        banner
        fields
        bannerOffset
        name: name_i18n
        description: description_i18n
        defaultSubmitLimit
      }
    }
  `),
  variables,
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

const notifications = useNotificationsStore()

const { t, currentLanguage } = useI18n()

const handleSave = async () => {
  try {
    await updateTemplate.mutate({
      where: {
        id,
      },
      data: {
        bannerOffset: topOffset.value,
        banner: typeof banner.value === 'string' ? null : banner.value,
        name: name.value,
        description: description.value,
        fields: fields.value.map((field) => field.value),
        defaultSubmitLimit: defaultSubmitLimit.value,
      },
    })

    notifications.enqueue({
      lines: [t('saved')],
      type: 'success',
    })

    await refetch()
  } catch (error) {
    if (error instanceof Error) {
      notifications.enqueue({
        lines: [t('cannot-save'), error.message],
        type: 'error',
      })
    }
  }
}

const template = computed(() => {
  return result.value?.template
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
const name = ref<Record<SupportedLanguages, string>>({
  en_GB: '',
  et_EE: '',
  ru_RU: '',
})
const description = ref<Record<SupportedLanguages, JSONContent | null>>({
  en_GB: null,
  et_EE: null,
  ru_RU: null,
})
const fields = ref<Array<{ value: FormFieldKind }>>([])
const defaultSubmitLimit = ref(0)

onResult((result) => {
  const template = result.data?.template

  if (!template) {
    return
  }

  topOffset.value = template.bannerOffset
  bannerFile.value = null
  bannerUrl.value = template.banner
  name.value = template.name
  description.value = template.description
  fields.value = template.fields.map((field) => ({ value: field }))
  formFieldKinds.value = Object.values(FormFieldKind)
    .filter((kind) => {
      return !fields.value.some((existingKind) => existingKind.value === kind)
    })
    .map((kind) => ({ value: kind }))
  defaultSubmitLimit.value = template.defaultSubmitLimit
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

.positioner-wrapper {
  width: 100%;
  position: relative;

  display: flex;
  align-items: center;
}
</style>

<template>
  <div class="column">
    <q-banner inline-actions rounded class="text-white q-mb-md q-py-none">
      <template v-slot:action>
        <q-btn
          round
          color="primary"
          :loading="updateTemplate.loading.value"
          icon="las la-save"
          @click="handleSave"
          class="q-ml-sm"
        />
      </template>
    </q-banner>

    <empty-content
      v-if="error"
      :content="error.message"
      :title="$t('network-error')"
      icon="las la-times"
      icon-colour="red"
    />

    <q-card flat>
      <single-image-preview-dialog
        :open="adjustOpen"
        @close="adjustOpen = false"
        v-model="topOffset"
        :label="name[currentLanguage]"
        :caption="size ? bytes(size) : null"
        :preview="preview"
        :width="dimensions[0]"
        :height="dimensions[1]"
        :ratio="ratio"
      />

      <q-card-section>
        <div v-if="loading && !template">
          <q-skeleton type="QInput" />
        </div>

        <q-form v-else-if="template" class="column" @submit.prevent="handleSave">
          <q-card flat bordered class="q-mb-md row wrap">
            <single-image-upload-field
              :model-value="banner"
              @update:model-value="(v: File | null) => (bannerFile = v)"
            >
              <template #prepend>
                <tooltip-button flat :tooltip="$t('enlarge')" round>
                  <q-avatar>
                    <q-img
                      :ratio="1"
                      height="40px"
                      width="40px"
                      fit="cover"
                      :src="preview"
                      @click="adjustOpen = true"
                    />
                  </q-avatar>
                </tooltip-button>
              </template>
            </single-image-upload-field>
          </q-card>

          <i18n-input v-model="name" :label="$t('name')" class="q-mb-md" />
          <i18n-text-editor v-model="description" label="asd" class="q-mb-md" />

          <submission-limit-field v-model="defaultSubmitLimit" class="q-mb-md" />

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
  </div>
</template>
