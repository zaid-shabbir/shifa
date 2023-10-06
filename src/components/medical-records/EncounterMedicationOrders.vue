<template>
  <expansion-panel
    :title="$t('encounters.medication_orders')"
    icon="orders"
    v-model="panel"
  >
    <template #content>
      <v-sheet class="px-3 py-5 bordered">
        <auto-complete
          :placeholder="$t('encounters.medication_orders_placeholder')"
          :items="filteredMedicationVariations"
          v-model="selectedMedicationVariations"
          :loading="loading"
          multiple
          chips
          item-title="medication_with_dosage"
          item-value="id"
          closable-chips
          class="text-primary"
        >
          <template #item="{ item }">
            <v-list-item-title
              class="text-h5 font-weight-bold ml-6 my-2"
              v-if="item.raw.header"
            >
              {{ item.raw.header }}
            </v-list-item-title>

            <v-divider v-else-if="item.raw.divider" />

            <v-list-item
              v-else
              class="py-0"
              @click="onMedicationVariation(item.value)"
              :active="selectedMedicationVariations.includes(item.value)"
            >
              <div class="d-flex align-center">
                <checkbox
                  v-model="selectedMedicationVariations"
                  :value="item.value"
                  style="display: contents"
                  @click.stop
                />
                <span>
                  {{ item.title }}
                </span>
              </div>
            </v-list-item>
          </template>
        </auto-complete>

        <text-area
          :label="$t('encounters.note')"
          v-model="medicationOrderNotes"
          class="mt-3"
        />

        <div class="text-right mt-2">
          <btn
            :primary="false"
            secondary
            :disabled="!selectedMedicationVariations.length"
            @click="addMedicationOrder"
            :loading="loading"
          >
            {{ $t('common.save') }}
          </btn>
        </div>

        <div
          v-if="currentEncounter.medication_orders.length"
          class="text-h6 bold"
        >
          {{ $t('encounters.medication_orders') }}
        </div>
        <v-card
          v-for="(medicationOrder, index) in currentEncounter.medication_orders"
          :key="index"
          class="pa-4 my-3 bg-water"
        >
          <btn
            size="x-small"
            icon-only
            :primary="false"
            variant="text"
            icon="$delete"
            color="primary"
            class="float-right mt-n1"
            :loading="loading"
            @click="deleteMedicationOrder(medicationOrder.id)"
          />
          <span
            v-for="(
              medicationOrderItem, index
            ) in medicationOrder.medication_order_items"
            :key="index"
          >
            • {{ medicationOrderItem.medication_variation.route }} :
            {{
              medicationOrderItem.medication_variation.medication_with_dosage
            }}
            <v-divider
              class="my-3"
              v-if="index !== medicationOrder.medication_order_items.length - 1"
            />
          </span>
          <span v-if="medicationOrder.notes" class="text-body-1 font-italic">
            <v-divider class="my-2" />
            {{ medicationOrder.notes }}
          </span>
        </v-card>
      </v-sheet>
    </template>
  </expansion-panel>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import _ from 'lodash';

import {
  useAuthStore,
  usePatientStore,
  useFacilityStore,
  useMetaDataStore,
  useEncounterStore,
} from '@/store';

import {
  IMedicationVariation,
  IMedicationOrderPayload,
  IMetaDataMedicationOrderQuery,
} from '@/types';

const authStore = useAuthStore();
const patientStore = usePatientStore();
const facilityStore = useFacilityStore();
const metaDataStore = useMetaDataStore();
const encounterStore = useEncounterStore();

const emit = defineEmits(['updated']);

const loading = ref<boolean>(false);
const medicationOrderNotes = ref<string>('');
const metaDataItems = ref<IMedicationVariation[]>([]);
const panel = ref<number | undefined>();
const selectedMedicationVariations = ref<number[]>([]);

const currentEncounter = computed(() => {
  return encounterStore.currentEncounter;
});

const filteredMedicationVariations = computed(() => {
  const medicationVariations: (
    | Partial<IMedicationVariation>
    | {
        header?: string;
        divider?: boolean;
      }
  )[] = [];

  const groupedMedicationVariations = _.groupBy(metaDataItems.value, 'route');
  const keys = Object.keys(groupedMedicationVariations);

  keys.forEach((key, index) => {
    medicationVariations.push({ header: key });

    medicationVariations.push(...groupedMedicationVariations[key]);

    if (index !== keys.length - 1) {
      medicationVariations.push({ divider: true });
    }
  });

  return medicationVariations;
});

onMounted(async () => {
  await getMetaDataItems();
});

const getMetaDataItems = async () => {
  metaDataItems.value = await metaDataStore.getMetaData<
    IMetaDataMedicationOrderQuery,
    IMedicationVariation
  >('medication-variation');
};

const onMedicationVariation = (medicationVariationId: number) => {
  if (selectedMedicationVariations.value.includes(medicationVariationId)) {
    const index = selectedMedicationVariations.value.indexOf(
      medicationVariationId,
    );
    if (index > -1) {
      selectedMedicationVariations.value.splice(index, 1);
    }
  } else {
    selectedMedicationVariations.value.push(medicationVariationId);
  }
};

const addMedicationOrder = async () => {
  if (!selectedMedicationVariations.value.length) {
    return;
  }

  const payload: IMedicationOrderPayload = {
    practitioner: authStore.userInfo.practitioner_id!,
    encounter: currentEncounter.value.id,
    patient: patientStore.currentPatientId!,
    notes: medicationOrderNotes.value,
    medication_order_items: selectedMedicationVariations.value.map(
      (medicationVariation) => ({
        medication_variation: medicationVariation,
      }),
    ),
  };

  loading.value = true;

  try {
    await encounterStore.addMedicationOrder(
      facilityStore.currentFacilityId!,
      payload,
    );

    selectedMedicationVariations.value = [];
    medicationOrderNotes.value = '';

    emit('updated');
  } finally {
    loading.value = false;
  }
};

const deleteMedicationOrder = async (medicationOrderId: number) => {
  loading.value = true;

  try {
    await encounterStore.deleteMedicationOrder(
      facilityStore.currentFacilityId!,
      medicationOrderId,
    );

    selectedMedicationVariations.value = [];
    medicationOrderNotes.value = '';

    emit('updated');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
