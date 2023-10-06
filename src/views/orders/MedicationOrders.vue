<template>
  <div class="d-flex flex-column fill-height w-100">
    <medication-orders-top-bar
      v-model:dates="dates"
      :statuses="statuses"
      v-model:status="status"
      :practitioners="practitioners"
      v-model:practitioner-id="practitionerId"
    />

    <medication-orders-table
      :dates="dates"
      :status="status"
      :practitioner-id="practitionerId"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, ComputedRef } from 'vue';
import MedicationOrdersTopBar from '@/components/medication-orders/MedicationOrdersTopBar.vue';
import MedicationOrdersTable from '@/components/medication-orders/MedicationOrdersTable.vue';
import { useFacilityStore, usePractitionerSearchStore } from '@/store';
import { IPractitioner, ISelect } from '@/types';
import { imagingOrderStatusesMock } from '@/constants';

const facilityStore = useFacilityStore();
const practitionerSearchStore = usePractitionerSearchStore();

const dates = ref<Date[]>([]);

const statuses = ref<ISelect<string | null>[]>([
  {
    title: 'All',
    value: null,
  },
  ...imagingOrderStatusesMock,
]);
const status = ref<string>();

const practitioners: ComputedRef<IPractitioner[]> = computed(() => {
  return [
    {
      id: null,
      first_name: 'All',
      last_name: '',
    } as unknown as IPractitioner,
    ...practitionerSearchStore.practitioners,
  ];
});
const practitionerId = ref<string>();

onMounted(async () => {
  await loadPractitioners();
});

const loadPractitioners = async () => {
  await practitionerSearchStore.searchPractitioners({
    fuuid: facilityStore.currentFacilityId!,
  });
};
</script>
