<template>
  <div class="d-flex flex-column fill-height w-100">
    <invoices-top-bar
      v-model:dates="dates"
      :statuses="statuses"
      v-model:status="status"
      :practitioners="practitioners"
      v-model:invoice-id="invoiceId"
      v-model:practitioner-id="practitionerId"
      @new-invoice="isShowInvoiceDialog = true"
    />

    <invoices-table
      :dates="dates"
      :status="status"
      :invoiceId="invoiceId"
      :practitioner-id="practitionerId"
    />
  </div>

  <invoice-dialog v-model="isShowInvoiceDialog" />
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, ComputedRef } from 'vue';
import InvoicesTopBar from '@/components/invoices/InvoicesTopBar.vue';
import InvoicesTable from '@/components/invoices/InvoicesTable.vue';
import { useFacilityStore, usePractitionerSearchStore } from '@/store';
import { IPractitioner, ISelect } from '@/types';
import { invoiceStatusesMock } from '@/constants';
import InvoiceDialog from '@/components/dialogs/InvoiceDialog.vue';

const facilityStore = useFacilityStore();
const practitionerSearchStore = usePractitionerSearchStore();

const status = ref<string>();
const dates = ref<Date[]>([]);
const invoiceId = ref<string>('');
const practitionerId = ref<string>();
const isShowInvoiceDialog = ref(false);

const statuses = ref<ISelect<string | null>[]>(invoiceStatusesMock);

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
