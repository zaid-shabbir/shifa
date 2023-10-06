import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import {
  IPaginatedResponse,
  IInvoiceQuery,
  IInvoice,
  IInvoicePayload,
  IProduct,
} from '@/types';
import { useFacilityStore } from '../facility';

export const useInvoiceStore = defineStore('invoice', () => {
  const commonStore = useCommonStore();
  const facilityStore = useFacilityStore();
  const searchResults = ref<IPaginatedResponse<IInvoice>>();
  const products = ref<IProduct[]>([]);

  const searchInvoices = async (query: IInvoiceQuery) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchInvoices(
        facilityStore.currentFacilityId!,
        query,
      );
      searchResults.value = res.data;

      return res.data;
    });
  };

  const getInvoiceItems = async (invoiceId: string) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getInvoiceItems(
        facilityStore.currentFacilityId!,
        invoiceId,
      );

      return res.data;
    });
  };

  const getProducts = async (facilityId: string) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getProducts(facilityId);

      products.value = res.data;
      return res.data;
    });
  };

  const createInvoice = async (
    facilityId: string,
    payload: IInvoicePayload,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().createInvoice(
        facilityId,
        payload,
      );

      return res.data;
    });
  };

  return {
    searchResults,
    products,

    searchInvoices,
    getInvoiceItems,
    createInvoice,
    getProducts,
  };
});
