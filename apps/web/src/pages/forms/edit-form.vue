<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

import { graphql } from 'src/graphql/generated'
import { EditFormQueryVariables } from 'src/graphql/generated/graphql'
import { useRouteParam } from 'src/lib/use-route-param'
import { useNotificationsStore } from 'src/stores/notifications'

import EmptyContent from 'src/components/empty-content.vue'
import TooltipButton from 'src/components/tooltip-button.vue'

import DateTimeField from 'src/components/form/date-time-field.vue'

import { formSubmit } from 'src/router/routes'
import { useI18n } from 'src/hooks/use-i18n'

const id = useRouteParam('id')

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
        name
        template {
          id
        }
      }
    }
  `),
  variables,
  { prefetch: false }
)

const name = ref('')
const dateTime = ref(new Date())

// const dateTimeLocalised = computed(() => {
//   return dateTime.value.toLocaleString(DateTime.DATETIME_FULL)
// })

onResult((result) => {
  const form = result.data?.form

  if (!form) {
    return
  }

  name.value = form.name ?? ''
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
    params: {
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
          <q-card flat bordered class="q-mb-md">
            <q-input borderless v-model="name" :label="t('name')" class="q-px-md" />
          </q-card>

          <date-time-field v-model="dateTime" :label="t('event-date-time')" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
