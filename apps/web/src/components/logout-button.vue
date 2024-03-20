<script lang="ts" setup>
import { config } from 'src/config'
import { apolloClient } from 'src/graphql/apollo/client'
import TooltipButton from './tooltip-button.vue'

const handleClick = async () => {
  await apolloClient.resetStore()
  window.location.href = config.backend.logoutUrl
}
</script>

<template>
  <tooltip-button
    position="bottom middle"
    tooltip="Log out"
    flat
    round
    color="white"
    icon="las la-sign-out-alt"
    @click="handleClick"
  />
</template>
