<template>
  <q-card class="fixed-center card">
    <q-card-section>
      <div class="text-h5">Error</div>
      <div class="text-subtitle2">Could not authenticate with Discord</div>
    </q-card-section>

    <q-separator />

    <q-card-section horizontal class="q-ma-md">
      <q-icon name="las la-exclamation" size="md" color="red" />
      An error occurred during your authentication flow. Please try again.
    </q-card-section>

    <q-separator />

    <q-card-section horizontal>
      <q-card-actions class="fit justify-center q-pa-none">
        <q-btn
          class="fit"
          flat
          color="blue"
          icon="las la-chevron-left"
          label="Try again"
          size="lg"
          to="/auth/login"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 350px;
}
</style>
