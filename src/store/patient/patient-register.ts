import { defineStore } from 'pinia';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { usePatientStore } from './patient';
import { IUpdatePatientPayload } from '@/types';

export const usePatientRegisterStore = defineStore('patient-register', () => {
  const commonStore = useCommonStore();
  const patientStore = usePatientStore();

  const registerPatient = async (payload: IUpdatePatientPayload) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().registerPatient(payload);
      // TODO: upon successful registration, the backend should return the same patient info as the search result
      patientStore.setCurrentPatient(res.data);

      return res.data;
    });
  };

  return {
    registerPatient,
  };
});
