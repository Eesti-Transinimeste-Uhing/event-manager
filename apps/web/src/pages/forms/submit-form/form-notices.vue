<script setup lang="ts">
import { FormSubmitQuery, FormSubmittabilityTag } from 'src/graphql/generated/graphql'
import { useI18n } from 'src/hooks/use-i18n'

const { t } = useI18n()

defineProps<{
  form: FormSubmitQuery['form']
}>()
</script>

<template>
  <q-card
    flat
    v-if="
      form?.submittability.tags.includes(FormSubmittabilityTag.SubmitLimitReached) &&
      !form.submittability.tags.includes(FormSubmittabilityTag.AlreadySubmitted)
    "
  >
    <q-banner class="bg-warning text-white" dense>
      <template v-slot:avatar>
        <q-icon name="las la-exclamation" />
      </template>

      {{ t('submission-limit-reached') }}
    </q-banner>
  </q-card>

  <q-card
    flat
    v-if="
      form?.submittability.tags.includes(FormSubmittabilityTag.SubmitLimitReached) &&
      form.submittability.tags.includes(FormSubmittabilityTag.AlreadySubmitted)
    "
  >
    <q-banner class="bg-warning text-white" dense>
      <template v-slot:avatar>
        <q-icon name="las la-exclamation" />
      </template>

      {{ t('submission-limit-reached-withdraw') }}
    </q-banner>
  </q-card>

  <q-card flat v-if="form?.submittability.tags.includes(FormSubmittabilityTag.AlreadySubmitted)">
    <q-banner class="bg-primary text-white" dense>
      <template v-slot:avatar>
        <q-icon name="las la-info-circle" />
      </template>

      {{ t('already-submitted-will-update') }}
    </q-banner>
  </q-card>
</template>
