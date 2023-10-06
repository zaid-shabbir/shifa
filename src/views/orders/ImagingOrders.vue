<template>
  <div class="d-flex flex-column fill-height w-100">
    <imaging-orders-top-bar
      :modalities="modalities"
      v-model:modality="modality"
      v-model:dates="dates"
      :statuses="statuses"
      v-model:status="status"
      :practitioners="practitioners"
      v-model:practitioner-id="practitionerId"
    />

    <imaging-orders-table
      :modality="modality"
      :dates="dates"
      :status="status"
      :practitioner-id="practitionerId"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, ComputedRef } from 'vue';

import ImagingOrdersTopBar from '@/components/imaging-orders/ImagingOrdersTopBar.vue';
import ImagingOrdersTable from '@/components/imaging-orders/ImagingOrdersTable.vue';
import {
  useFacilityStore,
  useMetaDataStore,
  usePractitionerSearchStore,
} from '@/store';
import { IKeyName, IPractitioner, ISelect } from '@/types';
import { imagingOrderStatusesMock } from '@/constants';

const metaDataStore = useMetaDataStore();
const facilityStore = useFacilityStore();
const practitionerSearchStore = usePractitionerSearchStore();

const modalities = ref<IKeyName[]>([]);
const modality = ref<string>();

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
  await loadModalities();
  await loadPractitioners();
});

const loadModalities = async () => {
  modalities.value = await metaDataStore.getMetaData<void, IKeyName>(
    'modality',
  );
};

const loadPractitioners = async () => {
  await practitionerSearchStore.searchPractitioners({
    fuuid: facilityStore.currentFacilityId!,
  });
};
</script>
