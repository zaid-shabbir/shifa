<template>
  <data-table-server
    v-model:page="page"
    v-model:expanded="expanded"
    :items-length="searchResults?.count"
    :items="searchResults?.results"
    :headers="headers"
    :search="search"
    no-gutters
    @update:optitons="loadItems"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>
          {{ item.raw.id }}
        </td>
        <td>
          {{ moment(item.raw.created_date).format('MMM DD, YYYY hh:mm a') }}
        </td>
        <td>{{ item.raw.test_profile_short_name }}</td>
        <td>
          {{ item.raw.practitioner_name }}
        </td>
        <td>
          {{ item.raw.patient_name }}
        </td>
        <td>{{ item.raw.status.name }}</td>
        <td>
          <btn
            :primary="false"
            secondary
            icon="mdi-square-edit-outline"
            icon-only
            icon-color="primary"
            size="x-small"
            class="my-3 mr-3"
            @click="onEdit(item.raw.id)"
          >
            <tooltip>{{ $t('common.edit') }}</tooltip>
          </btn>
          <btn
            :primary="false"
            secondary
            icon="mdi-poll"
            icon-only
            icon-color="primary"
            size="x-small"
            class="my-3 mr-3"
            @click="onViewReport(item.raw.id)"
          >
            <tooltip>{{ $t('orders.view_report') }}</tooltip>
          </btn>
          <btn
            :primary="false"
            secondary
            icon="mdi-image-outline"
            icon-only
            icon-color="primary"
            size="x-small"
            class="my-3 mr-3"
            @click="onViewImage(item.raw.id)"
          >
            <tooltip>{{ $t('orders.view_image') }}</tooltip>
          </btn>

          <btn
            :primary="isExpanded(item.raw.id)"
            secondary
            class="my-3 mr-3"
            :icon="
              isExpanded(item.raw.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            icon-only
            size="x-small"
            :loading="state.loadingDetailsId === item.raw.id"
            :disabled="!item.raw.test_count"
            @click="toggleDetails(item.raw.id)"
          >
            <tooltip>
              {{ $t('patient_list.see_quick_details') }}
            </tooltip>
          </btn>
        </td>
      </tr>
    </template>

    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <lab-test-item :tests="getLoadedLabTests(item.raw.id)" />
        </td>
      </tr>
    </template>
  </data-table-server>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment-timezone';
import _ from 'lodash';

import DataTableServer from '../common/DataTableServer.vue';
import LabTestItem from './LabTestItem.vue';
import { useLabOrderStore } from '@/store';
import { ILabOrderQuery, ILabOrderTest, ITableUpdateOptions } from '@/types';

const props = defineProps({
  labTestProfile: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  practitionerId: {
    type: String,
    default: '',
  },
  dates: {
    type: Array as PropType<Date[]>,
    default: () => [],
  },
});

const { t } = useI18n();

const labOrderStore = useLabOrderStore();

const headers = [
  {
    title: t('orders.order_number'),
    key: 'id',
    sortable: false,
  },
  {
    title: t('orders.order_date'),
    key: 'created_date',
    sortable: false,
  },
  {
    title: t('orders.test_profile'),
    key: 'test_profile',
    sortable: false,
  },
  {
    title: t('orders.practitioner'),
    key: 'practitioner_name',
    sortable: false,
  },
  {
    title: t('orders.patient'),
    key: 'patient_name',
    sortable: false,
  },
  {
    title: t('orders.status'),
    key: 'status',
    sortable: false,
  },
  {
    title: t('orders.action'),
    key: 'action',
    sortable: false,
  },
];

const page = ref(1);
const expanded = ref<string[]>([]);

const search = ref('');

const labTests = ref<Record<string, ILabOrderTest[]>>({});
const state = reactive<{
  loadingDetailsId: string | null;
}>({
  loadingDetailsId: null,
});

const searchResults = computed(() => {
  const results = _.cloneDeep(labOrderStore.searchResults?.results || [])
    .sort((a, b) => a.id - b.id)
    .map((result) => ({
      ...result,
      // v-datatable-server accepts only string for itemValue
      id: String(result.id),
    }));

  return {
    ...labOrderStore.searchResults,
    results,
  };
});

const getLoadedLabTests = (orderId: string) => {
  return labTests.value[orderId];
};

const clearLabTests = () => {
  labTests.value = {};
};

const triggerSearch = () => {
  page.value = 1;
  clearLabTests();

  search.value = String(Date.now());
};

watch(
  () => [props.labTestProfile, props.dates, props.status, props.practitionerId],
  () => {
    triggerSearch();
  },
);

watch(page, () => {
  // clean up cache
  clearLabTests();
});

const isExpanded = (orderId: string) => expanded.value.includes(orderId);

const loadItems = async ({ page }: ITableUpdateOptions) => {
  const query: ILabOrderQuery = {
    page,
    test_profile_id: props.labTestProfile || undefined,
    status: props.status || undefined,
    practitioner_id: props.practitionerId || undefined,
  };

  if (props.dates?.length > 0) {
    query.from_date = props.dates[0]
      ? moment.utc(props.dates[0]).format('YYYY-MM-DD')
      : undefined;
    query.to_date = props.dates[1]
      ? moment.utc(props.dates[1]).format('YYYY-MM-DD')
      : undefined;
  }

  await labOrderStore.searchLabOrders(query);
};

const getLabTests = async (orderId: string) => {
  const existingLabTests = getLoadedLabTests(orderId);
  if (!existingLabTests) {
    const tests = await labOrderStore.getLabTests(Number(orderId));
    labTests.value[orderId] = tests;
  }
};

const toggleDetails = async (orderId: string) => {
  if (isExpanded(orderId)) {
    const index = expanded.value.findIndex((id) => id === orderId);
    expanded.value.splice(index, 1);
  } else {
    state.loadingDetailsId = orderId;
    try {
      await getLabTests(orderId);
      expanded.value.push(orderId);
    } finally {
      state.loadingDetailsId = null;
    }
  }
};

const onEdit = async (orderId: string) => {};

const onViewReport = async (orderId: string) => {};

const onViewImage = async (orderId: string) => {};
</script>
