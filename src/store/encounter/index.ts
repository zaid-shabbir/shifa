import { defineStore } from 'pinia';

import { ref } from 'vue';
import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import {
  IEncounter,
  IEncounterItem,
  IEncounterFollowup,
  IScanPayload,
  ILabOrderPayload,
  IEncounterImagingOrder,
  IEncounterLabOrder,
  IMedicationOrderPayload,
} from '@/types';

export const useEncounterStore = defineStore('encounter', () => {
  const commonStore = useCommonStore();

  const encounters = ref<IEncounter[]>([]);
  const currentEncounter = ref<IEncounter>(<IEncounter>{});

  const setEncounters = (_encounters: IEncounter[]) => {
    encounters.value = _encounters;
  };

  const setCurrentEncounter = (encounter: IEncounter) => {
    currentEncounter.value = encounter;
  };

  const getPatientEncounters = async (
    patientId: string,
    isLoadDetail = true,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getPatientEncounters(
        patientId,
      );
      const encounters = res.data.sort((a, b) =>
        a.encounter_date.localeCompare(b.encounter_date),
      );
      setEncounters(encounters);

      if (isLoadDetail) {
        getPatientEncounter(
          encounters.length
            ? encounters[encounters.length - 1]
            : <IEncounter>{},
        );
      }

      return encounters;
    });
  };

  const getPatientEncounter = async (encounter: IEncounter) => {
    if (!encounter.id) return;
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getPatientEncounter(
        encounter.id,
      );
      setCurrentEncounter(res.data);
      return res.data;
    });
  };

  const addPatientEncounter = async (payload: IEncounter) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addPatientEncounter(payload);
      return res.data;
    });
  };

  const updatePatientEncounter = async (encounterId: string, payload: any) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().updatePatientEncounter(
        encounterId,
        payload,
      );
      return res.data;
    });
  };

  const getEncounterItems = async (encounterId: string, key: string) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getEncounterItems(
        encounterId,
        key,
      );
      return res.data;
    });
  };

  const addEncounterItem = async (
    payload: IEncounterItem | IEncounterFollowup,
    key: string,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addEncounterItem(payload, key);
      return res.data;
    });
  };

  const deleteEncounterItem = async (
    payload: IEncounterItem | IEncounterFollowup,
    key: string,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().deleteEncounterItem(
        payload,
        key,
      );
      return res.data;
    });
  };

  const addImagingOrder = async (payload: IScanPayload) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addImagingOrder(payload);
      return res.data;
    });
  };

  const deleteImagingOrder = async (payload: IEncounterImagingOrder) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().deleteImagingOrder(payload);
      return res.data;
    });
  };

  const addLabOrder = async (payload: ILabOrderPayload) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addLabOrder(payload);
      return res.data;
    });
  };

  const deleteLabOrder = async (payload: IEncounterLabOrder) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().deleteLabOrder(payload);
      return res.data;
    });
  };

  const getlabTestProfileItems = async (profileId: number) => {
    if (!profileId) return;
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getlabTestProfileItems(
        profileId,
      );
      return res.data;
    });
  };

  const addMedicationOrder = async (
    facilityId: string,
    payload: IMedicationOrderPayload,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().addMedicationOrder(
        facilityId,
        payload,
      );
      return res.data;
    });
  };

  const deleteMedicationOrder = async (
    facilityId: string,
    medicationOrderId: number,
  ) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().deleteMedicationOrder(
        facilityId,
        medicationOrderId,
      );
      return res.data;
    });
  };

  return {
    getPatientEncounters,
    getPatientEncounter,
    addPatientEncounter,
    updatePatientEncounter,

    getEncounterItems,
    addEncounterItem,
    deleteEncounterItem,

    setCurrentEncounter,

    addImagingOrder,
    deleteImagingOrder,

    addLabOrder,
    deleteLabOrder,
    getlabTestProfileItems,

    addMedicationOrder,
    deleteMedicationOrder,

    encounters,
    currentEncounter,
  };
});
