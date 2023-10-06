import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IPaginatedResponse, IPractitioner, ISearchPractitionerQuery } from '@/types';

export const usePractitionerSearchStore = defineStore('practitioner-search', () => {
  const commonStore = useCommonStore();

  const searchResults = ref<IPaginatedResponse<IPractitioner>>();

  const practitioners = computed(() => searchResults.value?.results || []);

  const setSearchResults = (results: IPaginatedResponse<IPractitioner>) => {
    searchResults.value = results;
  };

  const searchPractitioners = async (query: ISearchPractitionerQuery = {}) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchPractitioners(query);
      setSearchResults(res.data);

      return res.data;
    });
  };

  return {
    searchResults,
    practitioners,

    searchPractitioners,
  };
});
