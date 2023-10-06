<template>
  <div class="d-flex flex-wrap align-center">
    <mini-card
      v-for="(card, index) in cards"
      :key="index"
      width="270"
      :icon="card.icon"
      :title="card.title"
      :text="card.text"
      class="mr-3 my-3 pa-4"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import MiniCard from '@/components/common/MiniCard.vue';

const { t } = useI18n();

const cards = [
  { icon: 'heart-beat', title: t('billing.deposits'), text: '$ 34,350.89' },
  {
    icon: 'blood-pressure',
    title: t('billing.disbursments'),
    text: '$ 34,350.89',
  },
  {
    icon: 'temperature',
    title: t('billing.average_deposit'),
    text: '$ 34,350.89',
  },
  { icon: 'bmi', title: t('billing.average_disbursment'), text: '$ 34,350.89' },
];
</script>
