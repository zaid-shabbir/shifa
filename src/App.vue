<template>
  <div>
    <router-view />
    <Toast
      v-model="commonStore.toastData.show"
      :type="commonStore.toastData.type"
      :message="commonStore.toastData.message"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Toast from '@/components/common/Toast.vue';
import { LocalStorageService } from '@/services';
import { useAuthStore, useCommonStore } from '@/store';

const authStore = useAuthStore();
const commonStore = useCommonStore();

onMounted(async () => {
  const token = LocalStorageService.getInstance().getToken();
  if (token) authStore.getUserInfo();
});
</script>
