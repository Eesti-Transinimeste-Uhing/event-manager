<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import TooltipButton from './tooltip-button.vue'
import { graphql } from 'src/graphql/generated'
import { computed } from 'vue'
import { config } from 'src/config'
import { useNotificationsStore } from 'src/stores/notifications'

const { loading, result, onError } = useQuery(
  graphql(`
    query AccountMenuViewer {
      viewer {
        id
        discord {
          id
          name: global_name
          avatar
        }
      }
    }
  `),
  {},
  { prefetch: false }
)

const notifications = useNotificationsStore()

onError((error) => {
  notifications.enqueue({
    type: 'error',
    lines: ['Failed to fetch profile information', error.message],
  })
})

const profile = computed(() => {
  return result.value?.viewer?.discord
})
</script>

<style lang="scss" scoped>
.account-menu {
  > .list {
    width: 250px;
  }
}
</style>

<template>
  <tooltip-button tooltip="Account menu" position="bottom left" round color="secondary">
    <q-avatar>
      <q-circular-progress v-if="loading || !profile" indeterminate color="white" />

      <q-img v-else :src="profile?.avatar" />
    </q-avatar>

    <q-menu cover anchor="top left" class="account-menu">
      <q-item class="list">
        <q-item-section>
          <q-item-label>{{ profile?.name }}</q-item-label>
          <q-item-label caption> {{ profile?.id }} </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-avatar>
            <q-img no-spinner :src="profile?.avatar" />
          </q-avatar>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable :href="config.backend.logoutUrl">
        <q-item-section avatar>
          <q-icon name="las la-sign-out-alt" />
        </q-item-section>
        <q-item-section>Log out</q-item-section>
      </q-item>
    </q-menu>
  </tooltip-button>
</template>
