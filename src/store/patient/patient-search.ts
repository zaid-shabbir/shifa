import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IPatient, IPaginatedResponse, ISearchPatientQuery } from '@/types';
import { ref } from 'vue';

export const usePatientSearchStore = defineStore('patient-search', () => {
  const commonStore = useCommonStore();
  const searchResults = ref<IPaginatedResponse<IPatient>>();

  const searchPatients = async (query: ISearchPatientQuery) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchPatient(query);
      searchResults.value = res.data;

      return res.data;
    });
  };

  return {
    searchResults,

    searchPatients,
  };
});
