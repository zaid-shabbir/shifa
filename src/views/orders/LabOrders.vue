<template>
  <div class="d-flex flex-column fill-height w-100">
    <lab-orders-top-bar
      :labTestProfiles="labTestProfiles"
      v-model:labTestProfile="labTestProfile"
      v-model:dates="dates"
      :statuses="statuses"
      v-model:status="status"
      :practitioners="practitioners"
      v-model:practitioner-id="practitionerId"
    />

    <lab-orders-table
      :labTestProfile="labTestProfile"
      :dates="dates"
      :status="status"
      :practitioner-id="practitionerId"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, ComputedRef } from 'vue';
import LabOrdersTopBar from '@/components/lab-orders/LabOrdersTopBar.vue';
import LabOrdersTable from '@/components/lab-orders/LabOrdersTable.vue';
import {
  useFacilityStore,
  useMetaDataStore,
  usePractitionerSearchStore,
} from '@/store';
import { IPractitioner, ISelect, IKeyNames } from '@/types';
import { imagingOrderStatusesMock } from '@/constants';

const metaDataStore = useMetaDataStore();
const facilityStore = useFacilityStore();
const practitionerSearchStore = usePractitionerSearchStore();

const labTestProfiles = ref<IKeyNames[]>([]);
const labTestProfile = ref<string>('');

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
  await loadLabTestProfiles();
  await loadPractitioners();
});

const loadLabTestProfiles = async () => {
  labTestProfiles.value = await metaDataStore.getMetaData<void, IKeyNames>(
    'lab_test_profile',
  );
};

const loadPractitioners = async () => {
  await practitionerSearchStore.searchPractitioners({
    fuuid: facilityStore.currentFacilityId!,
  });
};
</script>
