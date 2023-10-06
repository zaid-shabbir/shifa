import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IPaginatedResponse, ILabOrder, ILabOrderQuery } from '@/types';
import { ref } from 'vue';
import { useFacilityStore } from '../facility';

export const useLabOrderStore = defineStore('lab-orders', () => {
  const commonStore = useCommonStore();
  const facilityStore = useFacilityStore();
  const searchResults = ref<IPaginatedResponse<ILabOrder>>();

  const searchLabOrders = async (query: ILabOrderQuery) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchLabOrders(
        facilityStore.currentFacilityId!,
        query,
      );
      searchResults.value = res.data;

      return res.data;
    });
  };

  const getLabTests = async (labOrderId: number) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getLabTests(
        facilityStore.currentFacilityId!,
        labOrderId,
      );

      return res.data;
    });
  };

  return {
    searchResults,

    searchLabOrders,
    getLabTests,
  };
});
