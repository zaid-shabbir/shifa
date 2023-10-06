import { defineStore } from 'pinia';
import { ref } from 'vue';

import { IFacility } from '@/types';
import { LocalStorageService } from '@/services';

export const useFacilityStore = defineStore('facility', () => {
  const localStorageService = LocalStorageService.getInstance();

  const currentFacilityId = ref(localStorageService.getCurrentFacilityId());
  const currentFacility = ref<IFacility>();

  const setCurrentFacilityId = (facilityId: string) => {
    currentFacilityId.value = facilityId;
    localStorageService.setCurrentFacilityId(facilityId);
  };

  const setCurrentFacility = (facility: IFacility) => {
    currentFacility.value = facility;
    setCurrentFacilityId(facility.id);
  };

  return {
    currentFacilityId,
    currentFacility,

    setCurrentFacilityId,
    setCurrentFacility,
  };
});
