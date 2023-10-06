import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { IPatientMeasurePivot, IMeasure, ITodayeMeasureValue } from '@/types';

export const usePatientMeasureStore = defineStore('patient-measures', () => {
  const commonStore = useCommonStore();

  const patientMeasures = ref<IPatientMeasurePivot>();
  const measures = ref<IMeasure[]>([]);

  const setPatientMeasures = (payload: IPatientMeasurePivot) => {
    patientMeasures.value = payload;
  };

  const setMeasures = (payload: IMeasure[]) => {
    measures.value = payload;
  };

  const getMeasures = async (measure_type: string) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getMeasures(measure_type);
      setMeasures(res.data);

      return res.data;
    });
  };

  const getPatientMeasures = async (
    patientId: string,
    measure_type: string,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getPatientMeasures(
        patientId,
        measure_type,
      );
      setPatientMeasures(res.data);

      return res.data;
    });
  };

  const addPatientMeasure = async (payload: ITodayeMeasureValue) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addPatientMeasure(payload);

      return res.data;
    });
  };

  return {
    patientMeasures,
    measures,
    getMeasures,
    getPatientMeasures,
    addPatientMeasure,
  };
});
