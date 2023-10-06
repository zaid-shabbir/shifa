import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { LocalStorageService, ApiService } from '@/services';
import { ILoginPayload, IToken, IUserInfo } from '@/types';
import { useCommonStore } from '@/store';

export const useAuthStore = defineStore('auth', () => {
  const localStorageService = LocalStorageService.getInstance();
  const commonStore = useCommonStore();

  const token = localStorageService.getToken();
  const accessToken = ref(token?.access || null);
  const refreshToken = ref(token?.refresh || null);
  const userInfo = ref<IUserInfo>(<IUserInfo>{});

  const isAuthenticated = computed(() => !!accessToken.value);

  const setToken = (token: IToken) => {
    accessToken.value = token.access;
    refreshToken.value = token.refresh;
    localStorageService.setToken(token);
  };

  const login = async (payload: ILoginPayload) => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().login(payload);
      setToken(res.data);

      return res.data;
    });
  };

  const getUserInfo = async () => {
    return commonStore.actionWrapper(async () => {
      const res = await ApiService.getInstance().getUserInfo();
      userInfo.value = res.data;
      return res.data;
    });
  };

  const $reset = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorageService.clear();
  };

  return {
    accessToken,
    refreshToken,

    userInfo,
    getUserInfo,

    isAuthenticated,
    login,
    $reset,
  };
});
