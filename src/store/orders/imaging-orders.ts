import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IPaginatedResponse, IImagingOrder, IImagingOrderQuery } from '@/types';
import { ref } from 'vue';
import { useFacilityStore } from '../facility';

export const useImagingOrderStore = defineStore('imaging-orders', () => {
  const commonStore = useCommonStore();
  const facilityStore = useFacilityStore();
  const searchResults = ref<IPaginatedResponse<IImagingOrder>>();

  const searchImagingOrders = async (query: IImagingOrderQuery) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchImagingOrders(
        facilityStore.currentFacilityId!,
        query,
      );
      searchResults.value = res.data;

      return res.data;
    });
  };

  const getImagingScans = async (imagingOrderId: number) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getImagingScans(
        facilityStore.currentFacilityId!,
        imagingOrderId,
      );

      return res.data;
    });
  };

  return {
    searchResults,

    searchImagingOrders,
    getImagingScans,
  };
});
