<script setup lang="ts">
import { AnnouncerOptionsDiscord } from 'src/graphql/generated/graphql'
import { useI18n } from 'src/hooks/use-i18n'

const { t } = useI18n()

const props = defineProps<{
  modelValue: AnnouncerOptionsDiscord
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: AnnouncerOptionsDiscord): void
}>()

const handleChange = (key: keyof AnnouncerOptionsDiscord, value?: string | number | null) => {
  if (!value) {
    return
  }

  emit('update:model-value', {
    ...props.modelValue,
    [key]: typeof value === 'number' ? String(value) : value,
  })
}
</script>

<template>
  <q-card flat bordered class="q-mb-md q-px-md">
    <q-input
      borderless
      @update:model-value="(value) => handleChange('channelId', value)"
      :model-value="modelValue.channelId"
      :label="t('channel-id')"
    />
  </q-card>

  <q-card flat bordered class="q-mb-md q-px-md">
    <q-input borderless :model-value="modelValue.guildId" :label="t('guild-id')" />
  </q-card>
</template>
