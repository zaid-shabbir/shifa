<template>
  <card-container
    :title="$t('patient_search.patient_search')"
    icon="$patient-search"
    class="w-100"
  >
    <data-table-server
      v-model:page="page"
      v-model:expanded="expanded"
      :items-length="searchResults?.count"
      :items="searchResults?.results"
      :headers="headers"
      :search="search"
      @update:optitons="loadItems"
    >
      <template v-slot:thead>
        <tr>
          <!-- Empty header for avatar -->
          <td />
          <td>
            <text-field
              v-model="searchFields.name"
              :label="t('patient_list.name')"
              class="ma-2"
            />
          </td>
          <td>
            <text-field
              v-model="searchFields.health_id"
              :label="t('patient_list.health_id')"
              class="ma-2"
            />
          </td>
          <td>
            <div class="mr-2 pr-2">
              <date-picker
                v-model="searchFields.date_of_birth"
                :placeholder="t('patient_list.birthday')"
                size="small"
                class="ma-2"
              />
            </div>
          </td>
          <td>
            <select-field
              v-model="searchFields.gender"
              :items="gendersMock"
              :label="t('patient_list.gender')"
            />
          </td>
          <td>
            <text-field
              v-model="searchFields.phone_1"
              :label="t('patient_list.phone')"
              class="ma-2"
            />
          </td>
          <td>
            <text-field
              v-model="searchFields.email"
              :label="t('patient_list.email')"
              class="ma-2"
            />
          </td>
        </tr>
      </template>

      <template v-slot:item="{ item }">
        <tr>
          <td>
            <v-icon
              color="primary"
              :icon="
                item.columns.gender === 'M' ? 'mdi-face-man' : 'mdi-face-woman'
              "
            />
          </td>
          <td>
            {{ item.columns.name }}
          </td>
          <td>
            {{ item.columns.health_id }}
          </td>
          <td>
            {{ item.columns.date_of_birth }}
          </td>
          <td>
            <v-chip
              size="x-small"
              :color="item.columns.gender == 'M' ? 'primary' : 'error'"
            >
              {{
                item.columns.gender == 'M'
                  ? $t('patient.male')
                  : $t('patient.female')
              }}
            </v-chip>
          </td>
          <td>
            {{ item.columns.phone_1 }}
          </td>
          <td>
            {{ item.columns.email }}
          </td>
          <td>
            <btn
              :primary="false"
              secondary
              icon="$patient-injury"
              icon-only
              size="x-small"
              class="my-3 mr-3"
              :loading="state.loadingViewProfileId === item.columns.id"
              @click="onViewProfile(item.columns.id)"
            >
              <tooltip>
                {{ t('patient_list.view_profile') }}
              </tooltip>
            </btn>

            <btn
              :primary="isExpanded(item.columns.id)"
              secondary
              class="my-3 mr-3"
              :icon="
                isExpanded(item.columns.id)
                  ? 'mdi-chevron-down'
                  : 'mdi-chevron-right'
              "
              icon-only
              size="x-small"
              :loading="state.loadingQuickDetailsId === item.columns.id"
              @click="toggleQuickDetails(item.columns.id)"
            >
              <tooltip>
                {{ t('patient_list.see_quick_details') }}
              </tooltip>
            </btn>
          </td>
        </tr>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <medical-record-item
              :medical-record="getLoadedPatientRecord(item.raw.id)"
            />
          </td>
        </tr>
      </template>
    </data-table-server>
  </card-container>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import _ from 'lodash';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment-timezone';

import DataTableServer from '../common/DataTableServer.vue';
import MedicalRecordItem from './MedicalRecordItem.vue';
import {
  usePatientRecordStore,
  usePatientSearchStore,
  usePatientStore,
} from '@/store';
import {
  IPatientRecord,
  ISearchPatientQuery,
  ISelect,
  ITableUpdateOptions,
} from '@/types';

const router = useRouter();
const { t } = useI18n();

const patientSearchStore = usePatientSearchStore();
const patientStore = usePatientStore();
const patientRecordStore = usePatientRecordStore();

const headers = [
  {
    title: '',
    key: 'picture',
    sortable: false,
    width: 44,
  },
  {
    title: t('patient_list.name'),
    key: 'name',
    sortable: false,
  },
  {
    title: t('patient_list.health_id'),
    key: 'health_id',
    sortable: false,
  },
  {
    title: t('patient_list.birthday'),
    key: 'date_of_birth',
    sortable: false,
    width: 184,
  },
  {
    title: t('patient_list.gender'),
    key: 'gender',
    sortable: false,
    width: 124,
  },
  {
    title: t('patient_list.phone'),
    key: 'phone_1',
    sortable: false,
  },
  {
    title: t('patient_list.email'),
    key: 'email',
    sortable: false,
  },
  {
    title: t('patient_list.action'),
    key: 'id',
    sortable: false,
  },
];

const page = ref(1);
const expanded = ref<string[]>([]);

const search = ref('');
const searchFields = reactive<{
  name?: string;
  health_id?: string;
  date_of_birth?: Date;
  gender: string;
  phone_1?: string;
  email?: string;
}>({
  gender: 'all',
});

const gendersMock: ISelect<string>[] = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Male',
    value: 'M',
  },
  {
    title: 'Female',
    value: 'F',
  },
];

const patientRecords = ref<IPatientRecord[]>([]);
const state = reactive<{
  loadingQuickDetailsId: string | null;
  loadingViewProfileId: string | null;
}>({
  loadingQuickDetailsId: null,
  loadingViewProfileId: null,
});

const searchResults = computed(() => {
  const results = patientSearchStore.searchResults?.results.map((res) => ({
    ...res,
    name: `${res.first_name} ${res.last_name}`,
  }));

  return {
    ...patientSearchStore.searchResults,
    results,
  };
});

const getLoadedPatientRecord = (patientId: string) => {
  return patientRecords.value.find(
    (patientRecord) => patientRecord.id === patientId,
  );
};

const clearPatientRecords = () => {
  patientRecords.value = [];
};

const triggerSearch = _.debounce(async () => {
  page.value = 1;
  clearPatientRecords();

  search.value = String(Date.now());
}, 600);

watch(searchFields, async () => {
  triggerSearch();
});

watch(page, () => {
  clearPatientRecords();
});

const isExpanded = (patientId: string) => expanded.value.includes(patientId);

const loadItems = async ({ page }: ITableUpdateOptions) => {
  const query: ISearchPatientQuery = {
    page,
  };

  if (searchFields.name) {
    query.first_name = searchFields.name.split(' ')[0];
    query.last_name = searchFields.name.split(' ')[1];
  }

  query.health_id = searchFields.health_id || undefined;
  query.date_of_birth = searchFields.date_of_birth
    ? moment.utc(searchFields.date_of_birth).format('YYYY-MM-DD')
    : undefined;
  query.gender =
    searchFields.gender !== 'all' ? searchFields.gender : undefined;
  query.phone = searchFields.phone_1 || undefined;
  query.email = searchFields.email || undefined;

  await patientSearchStore.searchPatients(query);
};

const searchPatientRecord = async (patientId: string) => {
  const existingPatientRecord = getLoadedPatientRecord(patientId);
  if (!existingPatientRecord) {
    const patientRecord = await patientRecordStore.getPatientRecord(patientId);
    patientRecords.value.push(patientRecord);
  }
};

const toggleQuickDetails = async (patientId: string) => {
  if (isExpanded(patientId)) {
    const index = expanded.value.findIndex((id) => id === patientId);
    expanded.value.splice(index, 1);
  } else {
    state.loadingQuickDetailsId = patientId;
    await searchPatientRecord(patientId);
    state.loadingQuickDetailsId = null;

    expanded.value.push(patientId);
  }
};

const onViewProfile = async (patientId: string) => {
  state.loadingViewProfileId = patientId;
  await searchPatientRecord(patientId);
  state.loadingViewProfileId = patientId;

  const currentPatient = searchResults.value.results?.find(
    (patient) => patient.id === patientId,
  );
  const currentPatientRecord = patientRecords.value.find(
    (patientRecord) => patientRecord.id === patientId,
  );

  if (currentPatient && currentPatientRecord) {
    patientStore.setCurrentPatient(currentPatient);
    patientRecordStore.setPatientRecord(currentPatientRecord);

    router.push('/patients/profile');
  }
};
</script>
