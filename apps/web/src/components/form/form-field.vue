<script lang="ts" setup>
import type { Component } from 'vue'

import { FormFieldKind } from 'src/graphql/generated/graphql'

import AgeField from './age-field.vue'
import EmailField from './email-field.vue'
import GenderField from './gender-field.vue'
import NameField from './name-field.vue'
import ConfirmEventField from './confirm-event-field.vue'

const props = defineProps<{
  kind: FormFieldKind
}>()

let fieldComponent: Component | null = null

switch (props.kind) {
  case FormFieldKind.Age:
    fieldComponent = AgeField
    break

  case FormFieldKind.Email:
    fieldComponent = EmailField
    break

  case FormFieldKind.Gender:
    fieldComponent = GenderField
    break

  case FormFieldKind.PreferredName:
    fieldComponent = NameField
    break

  case FormFieldKind.ConfirmEvent:
    fieldComponent = ConfirmEventField
    break

  default:
    break
}
</script>

<template>
  <component v-if="fieldComponent" :is="fieldComponent" v-bind="$attrs" />

  <q-card flat v-else>
    <q-card-section class="text-subtitle1">
      {{ $t('form-field-kind-not-implemented', { kind: props.kind }) }}
    </q-card-section>
  </q-card>
</template>
