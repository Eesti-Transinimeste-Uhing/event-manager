<script lang="ts" setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

import { graphql } from 'src/graphql/generated'
import { useRouteParam } from 'src/lib/use-route-param'
import { FormFieldKind, SubmitFormDataInput } from 'src/graphql/generated/graphql'

import FormField from 'src/components/form/form-field.vue'
import EmptyContent from 'src/components/empty-content.vue'
import SiteLogo from 'src/components/site-logo.vue'
import DarkToggle from 'src/components/dark-toggle.vue'
import { useQuasar } from 'quasar'
import { useNotificationsStore } from 'src/stores/notifications'
import { useI18n } from 'src/hooks/use-i18n'

const id = useRouteParam('id')

const { result, loading, error } = useQuery(
  graphql(`
    query FormSubmit($where: WhereIdInput!) {
      form(where: $where) {
        id
        name
        banner
        template {
          id
          fields
          description
        }
      }
    }
  `),
  { where: { id } },
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

const { t } = useI18n()

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
  } catch (error) {
    if (error instanceof Error) {
      notifications.enqueue({
        type: 'error',
        lines: ['Could not save your input', error.message],
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

const q = useQuasar()

const cardBackground = computed(() => {
  return q.dark.isActive ? 'rgba(35, 35, 35, 0.75)' : 'rgba(255, 255, 255, 0.75)'
})
</script>

<style lang="scss" scoped>
.bg-glass {
  background: v-bind(cardBackground);
  backdrop-filter: blur(10px);
}

.form-card {
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
      <q-skeleton v-if="loading" />

      <empty-content
        v-else-if="error"
        :content="error.message"
        icon-colour="red"
        icon="las la-times"
        :title="$t('network-error')"
      />

      <empty-content
        v-else-if="!result?.form"
        :content="$t('form-not-found')"
        icon-colour="primary"
        icon="las la-question"
        :title="$t('http-not-found')"
      />

      <q-form v-else-if="result" @submit="handleSubmit">
        <div class="column q-gutter-lg">
          <q-card flat class="form-card bg-glass">
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title class="flex items-center">
                <site-logo class="site-logo q-mr-sm" />
                <span class="font-pragati">{{ $t('brand-name') }}</span>
              </q-toolbar-title>

              <div class="row items-center">
                <q-icon name="las la-sun" size="sm" />
                <dark-toggle color="white" />
              </div>
            </q-toolbar>

            <q-img :src="result.form.banner" />
          </q-card>

          <q-card flat class="form-card bg-glass">
            <q-card-section>
              <div class="text-h2">{{ result.form.name }}</div>
            </q-card-section>

            <q-separator class="q-mb-md" />

            <q-card-section class="q-pt-none">
              <div>
                {{ result.form.template.description }}
              </div>
            </q-card-section>
          </q-card>

          <q-card flat class="form-card bg-glass">
            <q-card-section>
              <div v-for="(field, index) in formFields" :key="index">
                <form-field
                  v-bind="field"
                  :model-value="formState[field.kind]"
                  @update:model-value="(v: unknown) => handleFieldUpdate(field.kind, v)"
                />
              </div>
            </q-card-section>
          </q-card>

          <q-card flat class="form-card bg-glass">
            <q-card-actions align="right">
              <q-btn
                :loading="submitForm.loading.value"
                flat
                type="submit"
                :label="$t('register')"
                icon="las la-paper-plane"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-form>
    </transition>
  </div>
</template>
