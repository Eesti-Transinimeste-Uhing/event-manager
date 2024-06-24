<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

import { graphql } from 'src/graphql/generated'
import { EditFormQueryVariables, SupportedLanguages } from 'src/graphql/generated/graphql'
import { useRouteQuery } from 'src/lib/use-route-param'
import { useNotificationsStore } from 'src/stores/notifications'

import EmptyContent from 'src/components/empty-content.vue'
import TooltipButton from 'src/components/tooltip-button.vue'

import DateTimeField from 'src/components/form/date-time-field.vue'
import I18nInput from 'src/components/i18n/i18n-input.vue'
import SubmissionLimitField from 'src/components/form/submission-limit-field.vue'

import { formSubmit } from 'src/router/routes'
import { useI18n } from 'src/hooks/use-i18n'
import { DateTime } from 'luxon'

const id = useRouteQuery('id')

const variables = computed<EditFormQueryVariables>(() => {
  return {
    where: {
      id,
    },
  }
})

const updateForm = useMutation(
  graphql(`
    mutation UpdateForm($where: UpdateFormWhereInput!, $data: UpdateFormDataInput!) {
      updateForm(where: $where, data: $data) {
        id
      }
    }
  `)
)

const { result, loading, error, refetch, onResult } = useQuery(
  graphql(`
    query EditForm($where: WhereIdInput!) {
      form(where: $where) {
        id
        name: name_i18n
        location: location_i18n
        startsAt
        submitLimit
        template {
          id
        }
      }
    }
  `),
  variables,
  { prefetch: false }
)

const startsAt = ref(new Date())
const name = ref<Record<SupportedLanguages, string>>({
  en_GB: '',
  et_EE: '',
  ru_RU: '',
})
const location = ref<Record<SupportedLanguages, string>>({
  en_GB: '',
  et_EE: '',
  ru_RU: '',
})
const submitLimit = ref(0)

onResult((result) => {
  const form = result.data?.form

  if (!form) {
    return
  }

  name.value = form.name
  startsAt.value = DateTime.fromISO(form.startsAt).toJSDate()
  location.value = form.location
  submitLimit.value = form.submitLimit
})

const notifications = useNotificationsStore()

const { t } = useI18n()

const handleSave = async () => {
  try {
    if (!result.value?.form) {
      return
    }

    await updateForm.mutate({
      where: {
        id,
      },
      data: {
        name: name.value,
        location: location.value,
        startsAt: startsAt.value,
        submitLimit: submitLimit.value,
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

const router = useRouter()

const handlePreviewClick = () => {
  router.push({
    name: formSubmit.name,
    query: {
      id,
    },
  })
}
</script>

<template>
  <div class="column">
    <q-banner inline-actions rounded class="text-white q-mb-md q-py-none">
      <template v-slot:action>
        <tooltip-button
          :tooltip="$t('view')"
          round
          flat
          color="secondary"
          icon="las la-eye"
          class="q-ml-sm"
          @click="handlePreviewClick"
        />

        <q-btn
          round
          color="primary"
          :loading="updateForm.loading.value"
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
      <q-card-section>
        <div v-if="loading && !result">
          <q-skeleton type="QInput" />
        </div>

        <q-form v-else-if="result" class="column" @submit.prevent="handleSave">
          <i18n-input borderless v-model="name" :label="t('name')" class="q-mb-md" />

          <date-time-field v-model="startsAt" :label="t('event-date-time')" />

          <i18n-input borderless v-model="location" :label="t('location')" class="q-mb-md" />

          <submission-limit-field v-model="submitLimit" :label="t('submission-limit')" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
