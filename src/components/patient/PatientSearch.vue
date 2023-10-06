<template>
  <v-card
    width="453px"
    max-height="311"
    class="pa-2"
    v-click-outside="onClickOutside"
    :class="showResults ? 'patient-search-results' : 'patient-search'"
  >
    <text-field
      v-model="search"
      :loading="commonStore.isLoading"
      clearable
      @click="showResults = true"
      prepend-inner-icon="mdi-magnify"
      :label="$t('common.search')"
    />
    <v-expand-transition>
      <div v-if="showResults">
        <v-divider class="mx-n2 mt-2"></v-divider>
        <div
          v-if="searchStore.patients.length"
          class="patient-results px-2 overflow-y-auto"
        >
          <div
            v-for="(patient, index) in searchStore.patients"
            :key="index"
            class="patient-result cursor-pointer"
            @click="patientSelected(patient)"
          >
            <div class="d-flex justify-space-between align-center py-2">
              <div class="d-flex align-center">
                <div class="user-pic-container">
                  <img
                    v-if="patient.picture"
                    :src="patient.picture"
                    :alt="patient.first_name"
                  />
                  <v-icon
                    v-else
                    :icon="
                      patient.gender == 'M' ? 'mdi-face-man' : 'mdi-face-woman'
                    "
                  />
                </div>
                <div class="text-h6 ml-4">
                  {{ patient.first_name }} {{ patient.last_name }}
                </div>
                <v-chip
                  size="x-small"
                  class="ml-4"
                  :color="patient.gender == 'M' ? 'primary' : 'error'"
                >
                  {{ patient.date_of_birth }}
                </v-chip>
                <v-chip
                  size="x-small"
                  class="ml-4"
                  :color="patient.gender == 'M' ? 'primary' : 'error'"
                >
                  {{ calculateAge(patient.date_of_birth) }}
                  {{ $t('common.years') }}
                </v-chip>
              </div>
              <v-icon size="large" color="primary" icon="mdi-chevron-right" />
            </div>
            <v-divider v-if="index != results.length - 1" />
          </div>
        </div>
        <div v-else-if="commonStore.isLoading" class="text-center text-h6 py-2">
          {{ $t('patient.searching') }}
        </div>
        <div v-else-if="searchStore.noResults" class="text-center text-h6 py-2">
          {{ $t('common.no_results') }}
        </div>
        <div v-else class="text-center text-h6 py-2">
          {{ $t('patient.search') }}
        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import moment from 'moment-timezone';
import lodash from 'lodash';
import { ref, watch } from 'vue';
import { IPatient } from '@/types';

import { usePatientStore, useSearchStore, useCommonStore } from '@/store';

const searchStore = useSearchStore();
const commonStore = useCommonStore();
const patientStore = usePatientStore();

const search = ref('');
const results = ref([]);
const showResults = ref(false);

watch(search, async () => {
  handleSearch();
});

const handleSearch = lodash.debounce(async () => {
  await searchStore.searchPatient(search.value);
  if (search.value) showResults.value = true;
  else showResults.value = false;
}, 600);

const onClickOutside = () => {
  showResults.value = false;
};

const calculateAge = (dateOfBirth: string) => {
  const today = moment(new Date());
  const dob = moment(dateOfBirth);
  return today.diff(dob, 'years');
};

const patientSelected = (patient: IPatient) => {
  patientStore.setCurrentPatient(patient);
  // router.push('/patients/profile');
  showResults.value = false;
  search.value = '';
  searchStore.searchPatient(search.value);
};
</script>

<style scoped lang="scss">
.patient-search {
  box-shadow: none !important;
  color: transparent !important;
  background: transparent !important;
  border-radius: none !important;
  border: none !important;
}
.patient-search-results {
  box-shadow: 0px 4px 14px 0px rgba(224, 230, 242, 0.7);
}
.patient-results {
  max-height: 250px;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dce2f1;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track-piece:start {
    margin-top: 13px;
  }

  &::-webkit-scrollbar-track-piece:end {
    margin-bottom: 10px;
  }
}
.patient-result {
  &:hover {
    background: #f9f8fc;
  }
}
</style>
