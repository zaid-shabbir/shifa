<template>
  <div>
    <div class="d-flex flex-wrap">
      <MiniCard
        v-for="(card, index) in cards"
        :key="index"
        width="200"
        :icon="card.icon"
        :title="card.title"
        :text="card.text"
        class="mr-3 mb-3"
      />
    </div>

    <personal-information class="mb-3" v-if="!!patientStore.currentPatientId" />
    <MedicalSummary class="mb-3" />
    <Appointments class="my-3" />
  </div>
</template>

<script lang="ts" setup>
import MiniCard from '@/components/common/MiniCard.vue';
import MedicalSummary from '@/components/patient-profile/MedicalSummary.vue';
import Appointments from '@/components/patient-profile/Appointments.vue';
import PersonalInformation from '@/components/patient-profile/PersonalInformation.vue';
import { usePatientStore } from '@/store';

const patientStore = usePatientStore();

const cards = [
  { icon: 'heart-beat', title: 'Heart Rate', text: '120bpm' },
  { icon: 'blood-pressure', title: 'Blood Pressure', text: '128 /30 mm' },
  { icon: 'temperature', title: 'Temperature', text: '38.1C' },
  { icon: 'bmi', title: 'BMI', text: '58kg/144cm' },
  { icon: 'bar-chart', title: 'Glucose level', text: '1230 ml' },
];
</script>

<style lang="scss"></style>
