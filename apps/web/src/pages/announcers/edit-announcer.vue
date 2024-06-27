<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

import { graphql } from 'src/graphql/generated'
import {
  AnnouncerOptions,
  AnnouncerOptionsInput,
  AnnouncerType,
  EditFormQueryVariables,
} from 'src/graphql/generated/graphql'
import { useRouteQuery } from 'src/lib/use-route-param'
import { useNotificationsStore } from 'src/stores/notifications'

import EmptyContent from 'src/components/empty-content.vue'
import TooltipButton from 'src/components/tooltip-button.vue'

import { formSubmit } from 'src/router/routes'
import { useI18n } from 'src/hooks/use-i18n'

import DiscordOptionsEditor from './options/discord-options-editor.vue'
import { getIconForType } from './get-icon-for-type'

const id = useRouteQuery('id')

const variables = computed<EditFormQueryVariables>(() => {
  return {
    where: {
      id,
    },
  }
})

const updateAnnouncer = useMutation(
  graphql(`
    mutation UpdateAnnouncer($where: UpdateAnnouncerWhereInput!, $data: UpdateAnnouncerDataInput!) {
      updateAnnouncer(where: $where, data: $data) {
        id
      }
    }
  `)
)

const { result, loading, error, refetch, onResult } = useQuery(
  graphql(`
    query Announcer($where: WhereIdInput!) {
      announcer(where: $where) {
        id
        name
        type
        options {
          ... on AnnouncerOptionsDiscord {
            guildId
            channelId
          }
        }
      }
    }
  `),
  variables,
  { prefetch: false }
)

const name = ref('')
const options = ref<AnnouncerOptions | null | undefined>()

onResult((result) => {
  const announcer = result.data?.announcer

  if (!announcer) {
    return
  }

  name.value = announcer.name
  options.value = announcer.options
})

const notifications = useNotificationsStore()

const { t } = useI18n()

const handleSave = async () => {
  try {
    if (!result.value?.announcer) return

    let optionsKey: keyof AnnouncerOptionsInput | null = null

    switch (result.value.announcer.type) {
      case AnnouncerType.Discord:
        optionsKey = 'discord'
        break
    }

    if (!optionsKey || !options.value) return

    await updateAnnouncer.mutate({
      where: {
        id,
      },
      data: {
        name: name.value,
        options: {
          [optionsKey]: { ...options.value, __typename: undefined },
        } as AnnouncerOptionsInput,
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
          :loading="updateAnnouncer.loading.value"
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
          <q-card flat bordered class="q-mb-md q-px-md">
            <q-input borderless v-model="name" :label="t('name')" />
          </q-card>

          <template v-if="result.announcer?.type">
            <q-banner
              dense
              :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
              class="q-mb-md rounded-borders"
            >
              <template v-slot:avatar>
                <q-icon size="sm" :name="getIconForType(result.announcer.type)" />
              </template>

              {{ t('options-for-type-announcer', { type: result.announcer.type }) }}
            </q-banner>

            <discord-options-editor
              v-if="result.announcer?.type === AnnouncerType.Discord && options"
              v-model="options"
            />
          </template>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
