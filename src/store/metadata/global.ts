import { defineStore } from 'pinia';

import { useCommonStore } from '../common';
import { ApiService } from '@/services';
import { IMetaDataICDCodeQuery } from '@/types';

export const useMetaDataStore = defineStore('metadata', () => {
  const commonStore = useCommonStore();

  const getMetaData = <T, R>(encounter: string, params?: T) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getMetaData<T, R>(
        encounter,
        params,
      );
      return res.data;
    });
  };

  const getMetaDataICDCodes = (params: IMetaDataICDCodeQuery) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getMetaDataICDCodes(params);
      return res.data;
    });
  };

  return {
    getMetaData,
    getMetaDataICDCodes,
  };
});
