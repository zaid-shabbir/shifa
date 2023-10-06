import { defineStore } from 'pinia';
import { ref } from 'vue';

import { IPatient, IUpdatePatientPayload } from '@/types';
import { ApiService, LocalStorageService } from '@/services';
import { useCommonStore } from '../common';

export const usePatientStore = defineStore('patient', () => {
  const localStorageService = LocalStorageService.getInstance();
  const commonStore = useCommonStore();

  const currentPatientId = ref(localStorageService.getCurrentPatientId());
  const currentPatient = ref<IPatient>();

  const setCurrentPatientId = (patientId: string) => {
    currentPatientId.value = patientId;
    localStorageService.setCurrentPatientId(patientId);
  };

  const setCurrentPatient = (patient: IPatient) => {
    currentPatient.value = patient;
    setCurrentPatientId(patient.id);
  };

  const getCurrentPatient = (forceRefresh = false) => {
    if (!currentPatientId.value) {
      return;
    }

    if (!forceRefresh && currentPatientId.value === currentPatient.value?.id) {
      return currentPatient.value;
    }

    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getPatient(
        currentPatientId.value!,
      );
      setCurrentPatient(res.data);

      return res.data;
    });
  };

  const updateCurrentPatient = (payload: IUpdatePatientPayload) => {
    if (!currentPatientId.value) {
      return;
    }

    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().updatePatient(
        currentPatientId.value!,
        payload,
      );

      return res.data;
    });
  };

  return {
    currentPatientId,
    currentPatient,

    setCurrentPatientId,
    setCurrentPatient,
    getCurrentPatient,
    updateCurrentPatient,
  };
});
