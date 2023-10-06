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
          {{ item.columns.id }}
        </td>
        <td>
          {{
            moment.utc(item.columns.created_date).format('YYYY-MM-DD HH:mm:ss')
          }}
        </td>
        <td>
          {{ item.columns.modality }}
        </td>
        <td>
          {{ item.columns.practitioner_name }}
        </td>
        <td>
          {{ item.columns.patient_name }}
        </td>
        <td>
          {{ item.columns.status.name }}
        </td>
        <td>
          <btn
            :primary="false"
            secondary
            icon="mdi-square-edit-outline"
            icon-only
            icon-color="primary"
            size="x-small"
            class="my-3 mr-3"
            @click="onEdit(item.columns.id)"
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
            @click="onViewReport(item.columns.id)"
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
            @click="onViewImage(item.columns.id)"
          >
            <tooltip>{{ $t('orders.view_image') }}</tooltip>
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
            :loading="state.loadingDetailsId === item.columns.id"
            :disabled="!item.columns.scan_count"
            @click="toggleDetails(item.columns.id)"
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
          <scan-type-item :scans="getLoadedImagingScans(item.raw.id)" />
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
import ScanTypeItem from './ScanTypeItem.vue';
import { useImagingOrderStore } from '@/store';
import { IImagingOrderQuery, IScan, ITableUpdateOptions } from '@/types';

const props = defineProps({
  modality: {
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

const imagingOrderStore = useImagingOrderStore();

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
    title: t('orders.modality'),
    key: 'modality',
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
    key: 'scan_count',
    sortable: false,
  },
];

const page = ref(1);
const expanded = ref<string[]>([]);

const search = ref('');

const imagingScans = ref<Record<string, IScan[]>>({});
const state = reactive<{
  loadingDetailsId: string | null;
}>({
  loadingDetailsId: null,
});

const searchResults = computed(() => {
  const results = _.cloneDeep(imagingOrderStore.searchResults?.results || [])
    .sort((a, b) => a.id - b.id)
    .map((result) => ({
      ...result,
      // v-datatable-server accepts only string for itemValue
      id: String(result.id),
    }));

  return {
    ...imagingOrderStore.searchResults,
    results,
  };
});

const getLoadedImagingScans = (orderId: string) => {
  return imagingScans.value[orderId];
};

const clearImagingScans = () => {
  imagingScans.value = {};
};

const triggerSearch = () => {
  page.value = 1;
  clearImagingScans();

  search.value = String(Date.now());
};

watch(
  () => [props.modality, props.dates, props.status, props.practitionerId],
  () => {
    triggerSearch();
  },
);

watch(page, () => {
  // clean up cache
  clearImagingScans();
});

const isExpanded = (orderId: string) => expanded.value.includes(orderId);

const loadItems = async ({ page }: ITableUpdateOptions) => {
  const query: IImagingOrderQuery = {
    page,
    modality: props.modality || undefined,
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

  await imagingOrderStore.searchImagingOrders(query);
};

const getImagingScans = async (orderId: string) => {
  const existingImagingScans = getLoadedImagingScans(orderId);
  if (!existingImagingScans) {
    const scans = await imagingOrderStore.getImagingScans(Number(orderId));
    imagingScans.value[orderId] = scans;
  }
};

const toggleDetails = async (orderId: string) => {
  if (isExpanded(orderId)) {
    const index = expanded.value.findIndex((id) => id === orderId);
    expanded.value.splice(index, 1);
  } else {
    state.loadingDetailsId = orderId;
    try {
      await getImagingScans(orderId);
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
