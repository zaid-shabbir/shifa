import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from './common';
import { IPatient, IPaginatedResponse } from '@/types';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const commonStore = useCommonStore();
  const searchResults = ref<IPaginatedResponse<IPatient>>(
    <IPaginatedResponse<IPatient>>{},
  );
  const patients = ref<IPatient[]>([]);
  const noResults = ref<boolean>(false);

  const setResult = (response: IPaginatedResponse<IPatient>) => {
    searchResults.value = response;
    if (response.results && !response.results.length) noResults.value = true;
    else noResults.value = false;

    patients.value = (response.results || []).map((patient) => {
      return {
        ...patient,
        // picture:
        //   'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg',
      };
    });
  };

  const searchPatient = async (query: string) => {
    if (!query) setResult(<IPaginatedResponse<IPatient>>{});
    else
      await commonStore.actionWrapper(async () => {
        const res = await ApiService.getInstance().searchPatient({ query });
        setResult(res.data);
      });
  };

  return {
    patients,
    noResults,
    searchPatient,
  };
});
