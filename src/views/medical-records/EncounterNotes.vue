<template>
  <div v-if="!currentPatientId" class="text-center text-h5">
    {{ $t('encounters.no_patient_selected') }}
  </div>
  <div v-else class="w-full">
    <div class="text-right mt-3">
      <btn icon="mdi-plus" icon-before @click="isShowInvoiceDialog = true">
        {{ $t('encounters.new_invoice') }}
      </btn>
      <btn class="ml-2">
        {{ $t('encounters.email') }}
      </btn>
      <btn class="ml-2">
        {{ $t('encounters.print') }}
      </btn>
      <btn class="ml-2">
        {{ $t('common.close') }}
      </btn>
    </div>

    <v-card class="my-3">
      <v-slide-group
        v-if="encounters.length"
        :model-value="currentEncounter.id"
        class="w-full pa-4 overflow-x-auto slide-group"
        center-active
        show-arrows
        mandatory
      >
        <v-slide-group-item
          v-for="(encounter, index) in encounters"
          :key="index"
          :value="encounter.id"
        >
          <EncounterCard
            :is-active="encounter.id == currentEncounter.id"
            :encounter="encounter"
            class="mx-4"
            @click="getEncounter(encounter)"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-card>

    <Loader v-if="loading" />
    <div v-if="encounters.length && currentEncounter && !loading">
      <EncounterItem
        class="mb-3"
        icon="medical-notes-6"
        apiKey="complaint"
        :encounterItems="currentEncounter.complaints"
        :title="`${$t('encounters.chief_complaints')}`"
        :placeholder="`${$t('encounters.chief_complaints_plcaeholder')}`"
        @updated="encounterUpdated"
      />
      <EncounterItem
        class="mb-3"
        icon="chat"
        apiKey="observation"
        :encounterItems="currentEncounter.observations"
        :title="`${$t('encounters.observations')}`"
        :placeholder="`${$t('encounters.observation_plcaeholder')}`"
        @updated="encounterUpdated"
      />
      <EncounterImagingOrders class="mb-3" @updated="encounterUpdated" />
      <EncounterLabOrders class="mb-3" @updated="encounterUpdated" />
      <!-- <EncounterItem
        class="mb-3"
        icon="laboratory-drug-file"
        apiKey="lab_order"
        :encounterItems="currentEncounter.lab_orders"
        :title="`${$t('encounters.lab_orders')}`"
        :placeholder="`${$t('encounters.lab_orders_plcaeholder')}`"
        @updated="encounterUpdated"
      /> -->
      <EncounterItem
        class="mb-3"
        icon="medical-personnel-doctor"
        apiKey="diagnosis"
        :encounterItems="currentEncounter.diagnosis"
        :title="`${$t('encounters.diagnoses')}`"
        :placeholder="`${$t('encounters.diagnoses_plcaeholder')}`"
        @updated="encounterUpdated"
      />

      <EncounterMedicationOrders class="mb-3" @updated="encounterUpdated" />

      <!-- <EncounterItem
        class="mb-3"
        icon="medical-notes-3"
        apiKey="medication_order"
        :encounterItems="currentEncounter.medication_orders"
        :title="`${$t('encounters.medical_prescription')}`"
        :placeholder="`${$t('encounters.medical_prescription_plcaeholder')}`"
        @updated="encounterUpdated"
      /> -->
      <EncounterItem
        class="mb-3"
        icon="medical-personnel-doctor-1"
        apiKey="advice"
        :encounterItems="currentEncounter.advice"
        :title="`${$t('encounters.advice')}`"
        :placeholder="`${$t('encounters.advice_plcaeholder')}`"
        @updated="encounterUpdated"
      />
      <EncounterFollowUp class="mb-3" @updated="encounterUpdated" />
      <EncounterNotes class="mb-3" apiKey="notes" @updated="encounterUpdated" />
    </div>
    <div v-if="!encounters.length && !loading" class="text-center text-h5">
      {{ $t('encounters.no_encounters_found') }}
    </div>
  </div>
  <invoice-dialog
    v-model="isShowInvoiceDialog"
    :current-patient="patientStore.currentPatient"
    :current-encounter="currentEncounter"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed, WritableComputedRef } from 'vue';
import EncounterCard from '@/components/medical-records/EncounterCard.vue';

import EncounterItem from '@/components/medical-records/EncounterItem.vue';
import EncounterNotes from '@/components/medical-records/EncounterNotes.vue';
import EncounterFollowUp from '@/components/medical-records/EncounterFollowUp.vue';
import EncounterImagingOrders from '@/components/medical-records/EncounterImagingOrders.vue';
import EncounterLabOrders from '@/components/medical-records/EncounterLabOrders.vue';
import EncounterMedicationOrders from '@/components/medical-records/EncounterMedicationOrders.vue';
import InvoiceDialog from '@/components/dialogs/InvoiceDialog.vue';

import { usePatientStore, useEncounterStore } from '@/store';

import { IEncounter } from '@/types';

const patientStore = usePatientStore();
const encounterStore = useEncounterStore();

const loading = ref(false);
const isShowInvoiceDialog = ref(false);

const encounters: WritableComputedRef<IEncounter[]> = computed(() => {
  return encounterStore.encounters;
});

const currentPatientId: WritableComputedRef<string | null> = computed(() => {
  return patientStore.currentPatientId;
});

const currentEncounter: WritableComputedRef<IEncounter> = computed(() => {
  return encounterStore.currentEncounter;
});

onMounted(async () => {
  getEncounters();

  if (currentPatientId.value) {
    await patientStore.getCurrentPatient();
  }
});

watch(currentPatientId, async () => {
  getEncounters();
});

const getEncounters = async () => {
  if (!currentPatientId.value) return;
  loading.value = true;
  await encounterStore.getPatientEncounters(currentPatientId.value);
  loading.value = false;
};

const encounterUpdated = () => {
  encounterStore.getPatientEncounter(currentEncounter.value);
};

const getEncounter = async (encounter: IEncounter) => {
  loading.value = true;
  await encounterStore.getPatientEncounter(encounter);
  loading.value = false;
};
</script>

<style lang="scss" scoped>
.slide-group {
  max-width: 800px;
}
</style>
