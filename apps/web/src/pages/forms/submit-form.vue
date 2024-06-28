<script lang="ts" setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { graphql } from 'src/graphql/generated'
import { useRouteQuery } from 'src/lib/use-route-param'
import {
  FormFieldKind,
  FormSubmittabilityTag,
  RenderTarget,
  SubmitFormDataInput,
} from 'src/graphql/generated/graphql'

import FormField from 'components/form/form-field.vue'
import EmptyContent from 'components/empty-content.vue'
import SiteLogo from 'components/site-logo.vue'
import DarkToggle from 'components/dark-toggle.vue'
import TextEditor from 'components/text-editor/text-editor.vue'

import { useNotificationsStore } from 'src/stores/notifications'
import { useI18n } from 'src/hooks/use-i18n'
import { useUserPreferencesStore } from 'src/stores/user-preferences'

import FormNotices from './submit-form/form-notices.vue'

const id = useRouteQuery('id')
const { t, currentLanguage } = useI18n()

const variables = computed(() => {
  return { where: { id }, lang: currentLanguage.value, target: RenderTarget.Json }
})

const { result, loading, error, refetch } = useQuery(
  graphql(`
    query FormSubmit($where: WhereIdInput!, $lang: SupportedLanguages!, $target: RenderTarget!) {
      form(where: $where) {
        id
        name(where: { language: $lang })
        banner
        description(where: { language: $lang }, target: $target)
        submittability {
          submittable
          tags
        }
        template {
          id
          fields
        }
      }
    }
  `),
  variables,
  { prefetch: false }
)

const submitForm = useMutation(
  graphql(`
    mutation SubmitForm($where: SubmitFormWhereInput!, $data: [SubmitFormDataInput!]!) {
      submitForm(where: $where, data: $data)
    }
  `)
)

const notifications = useNotificationsStore()

const handleSubmit = async () => {
  try {
    await submitForm.mutate({
      where: {
        id,
      },
      data: Object.entries(formState.value).map(([key, value]): SubmitFormDataInput => {
        return {
          name: key,
          value: value === null ? null : String(value),
        }
      }),
    })

    notifications.enqueue({
      type: 'success',
      lines: [t('registered-message')],
    })

    formState.value = defaultFormState

    // Refetch the form to update the submittability status
    await refetch()
  } catch (error) {
    if (error instanceof Error) {
      notifications.enqueue({
        type: 'error',
        lines: [t('cannot-save'), error.message],
      })
    }
  }
}

const defaultFormState = {
  [FormFieldKind.Age]: null,
  [FormFieldKind.ConfirmEvent]: null,
  [FormFieldKind.Email]: null,
  [FormFieldKind.Gender]: null,
  [FormFieldKind.PreferredName]: null,
}

const formState = ref<Record<FormFieldKind, unknown>>(defaultFormState)

const formFields = computed(() => {
  return (
    result.value?.form?.template.fields.map((kind) => {
      switch (kind) {
        case FormFieldKind.Gender:
          return {
            kind,
            allowOther: true,
            clearable: !!formState.value[kind] || formState.value[kind] === '',
            randomOrder: true,
          }

        default: {
          return {
            kind,
          }
        }
      }
    }) ?? []
  )
})

const handleFieldUpdate = (name: FormFieldKind, value: unknown) => {
  formState.value = {
    ...formState.value,
    [name]: value,
  }
}

const userPreferencesStore = useUserPreferencesStore()
const { darkMode } = storeToRefs(userPreferencesStore)

const cardBackground = computed(() => {
  return darkMode.value ? 'rgba(35, 35, 35, 0.75)' : 'rgba(255, 255, 255, 0.75)'
})

// Show the edit UI if the form is not loading, there is no error, and the form
// is submittable. Also show the edit UI for people who have already submitted,
// so they can edit their submission even if the form is not submittable.
const showEditUi = computed(() => {
  return (
    !error.value &&
    result.value?.form &&
    (result.value.form.submittability.submittable ||
      result.value.form.submittability.tags.includes(FormSubmittabilityTag.AlreadySubmitted))
  )
})

// Only checks if all fields are filled, not if they are valid
const valid = computed(() => {
  return Object.values(formState.value).every(Boolean)
})
</script>

<style lang="scss" scoped>
.bg-glass {
  background: v-bind(cardBackground);
  backdrop-filter: blur(10px);
}

.form,
.banner-image {
  width: 768px;
  max-width: 100vw;
}

.site-logo {
  height: 25px;
}
</style>

<template>
  <div class="column items-center fit q-pt-xl">
    <transition name="card" mode="out-in">
      <empty-content
        v-if="error"
        :content="error.message"
        icon-colour="red"
        icon="las la-times"
        :title="$t('network-error')"
      />

      <empty-content
        v-else-if="!result?.form && !loading"
        :content="$t('form-not-found')"
        icon-colour="primary"
        icon="las la-question"
        :title="$t('http-not-found')"
      />

      <q-form v-else @submit="handleSubmit" class="form">
        <div class="column q-gutter-lg">
          <q-card flat class="bg-glass">
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title class="flex items-center">
                <site-logo class="site-logo q-mr-sm" />
                <span class="font-pragati">{{ $t('brand-name') }}</span>
              </q-toolbar-title>

              <div class="row items-center">
                <dark-toggle color="white" />
              </div>
            </q-toolbar>

            <q-skeleton v-if="loading" class="banner-image" height="432px" square />
            <q-img v-else-if="result" :src="result.form?.banner" class="banner-image" />
          </q-card>

          <q-card flat class="bg-glass" v-if="showEditUi">
            <q-card-section>
              <q-skeleton v-if="loading" type="rect" />
              <div v-else-if="result" class="text-h2">{{ result.form?.name }}</div>
            </q-card-section>

            <q-separator class="q-mb-md" />

            <q-card-section class="q-pt-none">
              <div v-if="loading">
                <q-skeleton v-for="i in 10" :key="i" type="text" />
              </div>

              <text-editor
                v-else-if="result"
                readonly
                :model-value="
                  result.form?.description ? JSON.parse(result.form?.description) : null
                "
              />
            </q-card-section>
          </q-card>

          <q-card flat class="bg-glass" v-if="showEditUi">
            <q-card-section v-if="loading">
              <div v-for="i in 5" :key="i">
                <q-skeleton type="QInput" class="q-mb-sm" />
              </div>
            </q-card-section>

            <q-card-section v-else-if="result">
              <div v-for="(field, index) in formFields" :key="index">
                <form-field
                  v-bind="field"
                  :model-value="formState[field.kind]"
                  @update:model-value="(v: unknown) => handleFieldUpdate(field.kind, v)"
                />
              </div>
            </q-card-section>
          </q-card>

          <form-notices v-if="!loading && result?.form" :form="result.form" />

          <q-card v-if="result && showEditUi" flat class="bg-glass">
            <q-card-actions align="right">
              <q-btn
                v-if="
                  result.form?.submittability.tags.includes(FormSubmittabilityTag.AlreadySubmitted)
                "
                flat
                :label="$t('withdraw')"
                icon="las la-trash"
                color="red"
              />

              <q-space />

              <q-btn
                :loading="submitForm.loading.value"
                flat
                type="submit"
                :label="$t('register')"
                icon="las la-paper-plane"
                :disable="!valid"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-form>
    </transition>
  </div>
</template>
