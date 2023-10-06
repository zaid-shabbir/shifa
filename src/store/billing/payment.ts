import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { useFacilityStore } from '../facility';
import { IPaginatedResponse, IPayment, IPaymentQuery } from '@/types';

export const usePaymentStore = defineStore('payment', () => {
  const commonStore = useCommonStore();
  const facilityStore = useFacilityStore();
  const searchResults = ref<IPaginatedResponse<IPayment>>();

  const searchInvoices = async (query: IPaymentQuery) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchPayments(
        facilityStore.currentFacilityId!,
        query,
      );
      searchResults.value = res.data;

      return res.data;
    });
  };

  return {
    searchResults,

    searchInvoices,
  };
});
