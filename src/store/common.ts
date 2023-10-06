import { defineStore } from 'pinia';
import { nextTick, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ToastType } from '@/types';

export const useCommonStore = defineStore('common', () => {
  const { t } = useI18n();

  const error = ref<any>(null);
  const errorMessage = ref('');
  const isLoading = ref(false);
  const toastData = reactive<{
    message: string;
    type: ToastType;
    show: boolean;
  }>({
    message: '',
    type: ToastType.Info,
    show: false,
  });

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setError = (serverError: any) => {
    error.value = serverError;

    if (!serverError) {
      errorMessage.value = '';
    } else {
      errorMessage.value =
        serverError.data?.detail ||
        serverError.data ||
        serverError.message ||
        t('notifications.error');
      showToast(ToastType.Error, errorMessage.value);
    }
  };

  const clearErrorOnSubmit = async () => {
    if (error.value) {
      error.value = null;
      await nextTick();
    }
  };

  const actionWrapper = async <T>(action: () => Promise<T>) => {
    try {
      setError(null);
      setLoading(true);
      return await action();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: ToastType, message: string) => {
    toastData.show = true;
    toastData.type = type;
    toastData.message = message;
  };

  return {
    error,
    isLoading,
    toastData,

    showToast,
    actionWrapper,
    clearErrorOnSubmit,
  };
});
