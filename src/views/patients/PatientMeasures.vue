<template>
  <div>
    <PatientProfile :show-toggle="false" />
    <patient-measures-table />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { usePatientStore } from '@/store';
import PatientProfile from '@/components/patient-profile/PatientProfile.vue';
import PatientMeasuresTable from '@/components/patient-list/PatientMeasuresTable.vue';

const router = useRouter();
const route = useRoute();

const patientStore = usePatientStore();

onMounted(async () => {
  const patientId = route.params.patientId;
  if (patientId !== patientStore.currentPatientId) {
    // TODO: fetch patient if the user puts patientId in the url manually
    router.push('/dashboard');
    return;
  }
});
</script>
