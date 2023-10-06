import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useCommonStore } from '../common';
import { usePatientStore } from './patient';

import { ApiService } from '@/services';
import { IAllergy, IAlert, IPatientAllergy, IPatientAlert, IPatientRecord } from '@/types';

export const usePatientRecordStore = defineStore('patient-record', () => {
  const commonStore = useCommonStore();
  const patientStore = usePatientStore();

  const patientRecord = ref<IPatientRecord>();
  const allergies = ref<IAllergy[]>([]);
  const alerts = ref<IAlert[]>([]);

  const getPatientRecord = (patientId: string) => {
    const id = patientId ? patientId : patientStore.currentPatientId;

    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getMedicalRecord(id as any);
      setPatientRecord(res.data);

      return res.data;
    });
  };

  const addPatientAllergy = (payload: IPatientAllergy) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addPatientAllergy(payload);
      return res.data;
    });
  };

  const updatePatientAllergy = (payload: IPatientAllergy) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().updatePatientAllergy(payload);
      return res.data;
    });
  };

  const deletePatientAllergy = (payload: IPatientAllergy) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().deletePatientAllergy(payload);
      return res.data;
    });
  };

  const getAllergies = () => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getAllergies();
      setAllergies(res.data);
      return res.data;
    });
  };

  const getAlerts = () => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getAlerts();
      setAlerts(res.data);
      return res.data;
    });
  };


  const addPatientAlert = (payload: IPatientAlert) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addPatientAlert(payload);
      return res.data;
    });
  };

  const updatePatientAlert = (payload: IPatientAlert) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().updatePatientAlert(payload);
      return res.data;
    });
  };

  const deletePatientAlert = (payload: IPatientAlert) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().deletePatientAlert(payload);
      return res.data;
    });
  };

  const setPatientRecord = (patient: IPatientRecord) => {
    patientRecord.value = patient;
  };

  const setAllergies = (result: IAllergy[]) => {
    allergies.value = result;
  };


  const setAlerts = (result: IAlert[]) => {
    alerts.value = result;
  };

  return {
    allergies,
    patientRecord,
    alerts,

    getPatientRecord,
    setPatientRecord,
    getAllergies,
    addPatientAllergy,
    updatePatientAllergy,
    deletePatientAllergy,
    getAlerts,
    addPatientAlert,
    updatePatientAlert,
    deletePatientAlert,
  };
});
