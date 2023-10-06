import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IBulkUpdatePatientConditionPayload, IPatientCondition } from '@/types';

export const usePatientConditionStore = defineStore('patient-condition', () => {
  const commonStore = useCommonStore();

  const patientConditions = ref<IPatientCondition[]>([]);

  const setPatientConditions = (conditions: IPatientCondition[]) => {
    patientConditions.value = conditions;
  };

  const getPatientConditions = async (patientId: string) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getPatientConditions(
        patientId,
      );
      setPatientConditions(res.data);

      return res.data;
    });
  };

  const bulkUpdatePatientConditions = async (
    patientId: string,
    conditions: IBulkUpdatePatientConditionPayload,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().bulkUpdatePatientConditions(
        patientId,
        conditions,
      );
      setPatientConditions(res.data);

      return res.data;
    });
  };

  return {
    patientConditions,

    getPatientConditions,
    bulkUpdatePatientConditions,
  };
});
