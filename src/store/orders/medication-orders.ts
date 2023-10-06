import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import {
  IPaginatedResponse,
  IMedicationOrder,
  IMedicationOrderQuery,
} from '@/types';
import { ref } from 'vue';
import { useFacilityStore } from '../facility';

export const useMedicationOrderStore = defineStore('medication-orders', () => {
  const commonStore = useCommonStore();
  const facilityStore = useFacilityStore();
  const searchResults = ref<IPaginatedResponse<IMedicationOrder>>();

  const searchMedicationOrders = async (query: IMedicationOrderQuery) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchMedicationOrders(
        facilityStore.currentFacilityId!,
        query,
      );
      searchResults.value = res.data;

      return res.data;
    });
  };

  const getMedicationItems = async (medicationOrderId: number) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getMedicationItems(
        facilityStore.currentFacilityId!,
        medicationOrderId,
      );

      return res.data;
    });
  };

  return {
    searchResults,

    searchMedicationOrders,
    getMedicationItems,
  };
});
