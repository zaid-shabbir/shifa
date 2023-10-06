import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IAppointment, IRegisterPatientAppointmentPayload } from '@/types';

export const usePatientAppointmentStore = defineStore('patient-appointment', () => {
  const commonStore = useCommonStore();

  const registerPatientAppointment = async (payload: IRegisterPatientAppointmentPayload) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().registerPatientAppointment(payload);
      return res.data;
    });
  };

  const updatePatientAppointment = async (patientId: string, appointmentId: string, payload: Partial<IAppointment>) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().updatePatientAppointment(patientId, appointmentId, payload);
      return res.data;
    });
  };

  return {
    registerPatientAppointment,
    updatePatientAppointment,
  };
});
