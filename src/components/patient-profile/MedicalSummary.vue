<template>
  <expansion-panel
    :title="$t('dashboard.encounter_summary')"
    icon="medical-notes"
    v-model="panel"
  >
    <template #content>
      <v-sheet class="px-3 py-5 bg-whisper bordered">
        <div class="text-center">
          <v-btn-toggle v-model="summarySection" mandatory group>
            <btn value="diag"> {{ $t('dashboard.recent_diagnosis') }} </btn>
            <btn value="allergies"> {{ $t('dashboard.allergies') }} </btn>
          </v-btn-toggle>
        </div>
        <div class="mt-6 d-flex flex-wrap">
          <SummaryCard
            v-for="(card, index) in summaryCard"
            :key="index"
            :details="card"
            class="mr-5 mb-5"
          />
        </div>
      </v-sheet>
    </template>
  </expansion-panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SummaryCard from '@/components/patient-profile/SummaryCard.vue';

const panel = ref<number | undefined>();
const summarySection = ref('diag');
const summaryCard = [
  {
    date: '06-28-2022',
    type: 'Heartburn',
    code: '787.10',
    problem: 'Heartburn',
    notes:
      'Quidem sequi aspernatur qui Quam ut accusamus aut in. Rerum et ea velit ut dolor quaerat voluptatibus',
  },
  {
    date: '07-28-2022',
    type: 'Headache',
    code: '997.10',
    problem: 'Head hurt',
    notes: 'Another encounter asdf asdf. The asdf asdf',
  },
  {
    date: '10-28-2022',
    type: 'Skin',
    code: '997.10',
    problem: 'Rash',
    notes:
      'One more Quidem sequi aspernatur qui Quam ut accusamus aut in. Rerum et ea velit ut dolor quaerat voluptatibus',
  },
];
</script>

<style lang="scss" scoped></style>
