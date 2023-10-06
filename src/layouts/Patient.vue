<template>
  <v-app>
    <top-bar @menuClicked="isShowSidebar = !isShowSidebar" />
    <side-bar v-model="isShowSidebar" />
    <v-main>
      <v-container
        fluid
        class="bg-white-lilac-22 align-start justify-center fill-height"
      >
        <v-row>
          <v-col :cols="vertical && currentPatientId ? 8 : 12">
            <PatientProfile
              v-if="!vertical && currentPatientId"
              @toggle="vertical = !vertical"
              class="mb-3"
            />
            <router-view />
          </v-col>
          <v-col v-if="vertical && currentPatientId" cols="4">
            <PatientProfile vertical @toggle="vertical = !vertical" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed, WritableComputedRef } from 'vue';
import TopBar from '@/components/layouts/TopBar.vue';
import SideBar from '@/components/layouts/SideBar.vue';
import PatientProfile from '@/components/patient-profile/PatientProfile.vue';

import { usePatientStore } from '@/store';

const patientStore = usePatientStore();

const isShowSidebar = ref(true);
const vertical = ref<boolean>(true);

const currentPatientId: WritableComputedRef<string | null> = computed(() => {
  return patientStore.currentPatientId;
});
</script>

<style scoped></style>
