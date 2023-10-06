import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { AppointmentAction } from '@/types';

export const useAppointmentStore = defineStore('appointment', () => {
  const commonStore = useCommonStore();

  const updateAppointmentAction = async (appointmentId: string, action: AppointmentAction) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().updateAppointmentAction(appointmentId, action);
      return res.data;
    });
  };

  return {
    updateAppointmentAction,
  };
});
