<template>
  <div class="d-flex flex-column fill-height w-100">
    <payments-top-bar
      v-model:dates="dates"
      :paymentMethods="paymentMethods"
      v-model:paymentMethod="paymentMethod"
      :practitioners="practitioners"
      v-model:payment-id="paymentId"
      v-model:practitioner-id="practitionerId"
    />

    <payments-summary />

    <payments-table
      :dates="dates"
      :payment-id="paymentId"
      :payment-method="paymentMethod"
      :practitioner-id="practitionerId"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, ComputedRef } from 'vue';
import PaymentsTopBar from '@/components/payments/PaymentsTopBar.vue';
import PaymentsSummary from '@/components/payments/PaymentsSummary.vue';
import PaymentsTable from '@/components/payments/PaymentsTable.vue';
import { useFacilityStore, usePractitionerSearchStore } from '@/store';
import { IPractitioner, ISelect } from '@/types';
import { paymentMethodsMock } from '@/constants';

const facilityStore = useFacilityStore();
const practitionerSearchStore = usePractitionerSearchStore();

const paymentMethod = ref<string>();
const dates = ref<Date[]>([]);
const paymentId = ref<string>('');
const practitionerId = ref<string>();

const paymentMethods = ref<ISelect<string | null>[]>(paymentMethodsMock);

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

onMounted(async () => {
  await loadPractitioners();
});

const loadPractitioners = async () => {
  await practitionerSearchStore.searchPractitioners({
    fuuid: facilityStore.currentFacilityId!,
  });
};
</script>
