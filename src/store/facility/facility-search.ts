import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IFacility, IPaginatedResponse, ISearchFacilityQuery } from '@/types';

export const useFacilitySearchStore = defineStore('facility-search', () => {
  const commonStore = useCommonStore();

  const searchResults = ref<IPaginatedResponse<IFacility>>();

  const facilities = computed(() => searchResults.value?.results || []);

  const setSearchResults = (results: IPaginatedResponse<IFacility>) => {
    searchResults.value = results;
  };

  const searchFacilities = async (query: ISearchFacilityQuery = {}) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchFacilities(query);
      setSearchResults(res.data);

      return res.data;
    });
  };

  return {
    searchResults,
    facilities,

    searchFacilities,
  };
});
