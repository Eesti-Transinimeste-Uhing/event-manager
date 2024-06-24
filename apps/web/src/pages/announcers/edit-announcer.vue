<script setup lang="ts">
import { useRouteQuery } from 'src/lib/use-route-param'

const announcerId = useRouteQuery('id')
</script>

<template>
  <h1>Editing {{ announcerId }}</h1>
</template>
