<template>
  <expansion-panel
    :title="$t('patient.personal_information')"
    icon="patient-injury"
    v-model="panel"
  >
    <template #content>
      <div class="centered w-full">
        <patient-profile-form :current-patient="patientStore.currentPatient" />
      </div>
    </template>
  </expansion-panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import PatientProfileForm from '../forms/PatientProfileForm.vue';
import { usePatientStore } from '@/store';

const patientStore = usePatientStore();

const panel = ref<number | undefined>();

onMounted(async () => {
  if (patientStore.currentPatientId) {
    await patientStore.getCurrentPatient();
  }
});
</script>

<style lang="scss" scoped></style>
