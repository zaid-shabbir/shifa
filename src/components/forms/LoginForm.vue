<template>
  <div class="centered flex-column">
    <v-img
      width="182"
      height="71"
      src="../../assets/images/login/shifa-logo.png"
    />
    <v-form
      v-model="isValidForm"
      @submit.prevent="submit"
      class="login-form d-flex flex-column"
    >
      <text-field
        v-model="formData.username"
        class="mb-5"
        attr="username"
        :rules="[required]"
        :label="$t('auth.user_name')"
        prepend-inner-icon="$email"
      />

      <text-field
        v-model="formData.password"
        type="password"
        class="mb-5"
        attr="password"
        :rules="[required]"
        :label="$t('auth.password')"
        prepend-inner-icon="$password"
      />

      <select-field
        v-model="formData.facilityId"
        :items="facilitySearchStore.facilities"
        item-title="name"
        item-value="id"
        :rules="[required]"
        :label="$t('auth.clinic_hosp')"
        class="mb-5"
      />

      <btn primary type="submit" :loading="commonStore.isLoading">
        {{ $t('layouts.login') }}
      </btn>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import {
  useCommonStore,
  useAuthStore,
  useFacilitySearchStore,
  useFacilityStore,
} from '@/store';
import { required } from '@/utils/validations';
import { onMounted } from 'vue';

const router = useRouter();

const authStore = useAuthStore();
const commonStore = useCommonStore();
const facilityStore = useFacilityStore();
const facilitySearchStore = useFacilitySearchStore();

const isValidForm = ref(false);

const formData = reactive<{
  username: string;
  password: string;
  facilityId?: string;
}>({
  username: '',
  password: '',
});

onMounted(async () => {
  await facilitySearchStore.searchFacilities();
});

const submit = async () => {
  await commonStore.clearErrorOnSubmit();

  if (!isValidForm.value) {
    return;
  }

  await authStore.login({
    username: formData.username,
    password: formData.password,
    facility_id: formData.facilityId!,
  });

  const facility = facilitySearchStore.facilities.find(
    (f) => f.id === formData.facilityId,
  );
  facilityStore.setCurrentFacility(facility!);

  await authStore.getUserInfo();

  router.push('/dashboard');
};
</script>

<style lang="scss" scoped>
.login-form {
  min-width: 402px;
  margin-top: 91px;
}
</style>
