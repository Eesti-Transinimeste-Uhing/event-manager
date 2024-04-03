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
      lines: ['Input saved, see you soon!'],
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
        title="Network error"
      />

      <empty-content
        v-else-if="!result?.form"
        content="This form doesn't exist"
        icon-colour="primary"
        icon="las la-question"
        title="404 - Not found"
      />

      <q-form v-else-if="result" @submit="handleSubmit">
        <div class="column q-gutter-lg">
          <q-card flat class="form-card bg-glass">
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title class="flex items-center">
                <site-logo class="site-logo q-mr-sm" />
                <span class="font-pragati">Eesti Transinimeste Ühing</span>
              </q-toolbar-title>

              <div class="row items-center">
                <q-icon name="las la-sun" size="sm" />
                <dark-toggle color="white" />
              </div>
            </q-toolbar>

            <q-card-section>
              <div class="text-h2">{{ result.form.name }}</div>
            </q-card-section>

            <q-separator class="q-mb-md" />

            <q-card-section class="q-pt-none">
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                piece of classical Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked
                up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
                going through the cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
                BC. This book is a treatise on the theory of ethics, very popular during the
                Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
                from a line in section 1.10.32.
              </p>

              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority
                have suffered alteration in some form, by injected humour, or randomised words which
                don't look even slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
                text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
                chunks as necessary, making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of model sentence
                structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
                Ipsum is therefore always free from repetition, injected humour, or
                non-characteristic words etc.
              </p>
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
                label="Register"
                icon="las la-paper-plane"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-form>
    </transition>
  </div>
</template>
