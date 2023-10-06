import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IAppointment, ISearchFacilityAppointmentsQuery } from '@/types';

export const useFacilityAppointmentStore = defineStore('facility-appointment', () => {
  const commonStore = useCommonStore();

  const facilityAppointments = ref<IAppointment[]>([]);

  const searchFacilityAppointments = async (facilityId: string, query: ISearchFacilityAppointmentsQuery = {}) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().searchFacilityAppointments(facilityId, query);
      facilityAppointments.value = res.data;

      return res.data;
    });
  };

  return {
    facilityAppointments,

    searchFacilityAppointments,
  };
});
