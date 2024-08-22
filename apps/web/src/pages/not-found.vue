<script lang="ts" setup>
import EmptyContent from 'src/components/empty-content.vue'
import LanguageTabs from 'src/components/i18n/language-tabs.vue';

import background from 'assets/background/gr-stocks-Iq9SaJezkOE-unsplash-lg.jpg'
import { useI18n } from 'src/hooks/use-i18n';

const { changeLanguage, currentLanguage } = useI18n()
</script>

<style lang="scss" scoped>
.empty-content {
  height: 100vh;
  width: 100%;
}

.background-overlay {
  background-image: linear-gradient(0, rgba(0, 0, 0, 0.7) 0, rgba(0, 0, 0, 0.9) 20%, black 90%);
  backdrop-filter: blur(5px);
}

.credit {
  bottom: 0;
  height: 50px;
  width: 100%;
}
</style>

<template>
  <div class="relative-position empty-content">
    <q-img :src="background" no-spinner class="empty-content absolute-top-left" />

    <div class="empty-content absolute-top-left background-overlay" />

    <empty-content
    class="empty-content absolute-top-left"
    icon-colour="primary"
    icon="las la-question"
    :title="$t('http-not-found')"
    :content="$t('http-not-found-description')"
    />

    <language-tabs :model-value="currentLanguage" @update:model-value="changeLanguage" />

    <q-btn
      flat
      label="Photo by GR Stocks on Unsplash"
      class="absolute credit"
      no-caps
      href="https://unsplash.com/photos/grayscale-photo-of-person-holding-glass-Iq9SaJezkOE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
      rel="noopener noreferrer"
      target="_blank"
    />
  </div>
</template>
