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
          {{ item.raw.invoice_number }}
        </td>
        <td>
          {{ moment(item.raw.invoice_date).format('MMM DD, YYYY hh:mm a') }}
        </td>
        <td>
          {{ $money(item.raw.total_amount, item.raw.currency?.code) }}
        </td>
        <td>
          {{ item.raw.currency.name }}
        </td>
        <td>
          {{ item.raw.practitioner_name }}
        </td>
        <td>
          {{ item.raw.patient_name }}
        </td>
        <td>
          <v-chip
            variant="outlined"
            size="small"
            :color="getStatusColor(item.raw.status?.code)"
          >
            {{ item.raw.status?.name }}
          </v-chip>
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
            :disabled="!item.raw.item_count"
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
          <invoice-item :items="getLoadedInvoiceItems(item.raw.id)" />
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
import InvoiceItem from './InvoiceItem.vue';
import { useInvoiceStore } from '@/store';
import { IInvoiceItem, IInvoiceQuery, ITableUpdateOptions } from '@/types';
import { $money } from '@/utils';

const props = defineProps({
  invoiceId: {
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

const invoiceStore = useInvoiceStore();

const headers = [
  {
    title: t('billing.invoice_number'),
    key: 'invoice_number',
    sortable: false,
  },
  {
    title: t('billing.invoice_date'),
    key: 'invoice_date',
    sortable: false,
  },
  {
    title: t('billing.amount'),
    key: 'amount',
    sortable: false,
  },
  {
    title: t('billing.currency'),
    key: 'currency',
    sortable: false,
  },
  {
    title: t('common.practitioner'),
    key: 'practitioner',
    sortable: false,
  },
  {
    title: t('common.patient'),
    key: 'patient',
    sortable: false,
  },
  {
    title: t('common.status'),
    key: 'status',
    sortable: false,
  },
  {
    title: t('common.actions'),
    key: 'actions',
    sortable: false,
  },
];

const page = ref(1);
const expanded = ref<string[]>([]);

const search = ref('');

const invoiceItems = ref<Record<string, IInvoiceItem[]>>({});
const state = reactive<{
  loadingDetailsId: string | null;
}>({
  loadingDetailsId: null,
});

const searchResults = computed(() => {
  const results = _.cloneDeep(invoiceStore.searchResults?.results || []).map(
    (result) => ({
      ...result,
      // v-datatable-server accepts only string for itemValue
      id: String(result.id),
    }),
  );

  return {
    ...invoiceStore.searchResults,
    results,
  };
});

const getStatusColor = (status: string) => {
  if (!status) return;
  if (status === 'pending') return 'red';
  else if (status === 'paid') return 'green';
  else if (status === 'cancelled') return 'blue';
  else if (status === 'partial') return 'orange';
  else if (status === 'overpaid') return 'purple';
  else return '';
};

const getLoadedInvoiceItems = (invoiceId: string) => {
  return invoiceItems.value[invoiceId];
};

const clearInvoiceItems = () => {
  invoiceItems.value = {};
};

const triggerSearch = () => {
  page.value = 1;
  clearInvoiceItems();

  search.value = String(Date.now());
};

watch(
  () => [props.invoiceId, props.dates, props.status, props.practitionerId],
  () => {
    triggerSearch();
  },
);

watch(page, () => {
  // clean up cache
  clearInvoiceItems();
});

const isExpanded = (invoiceId: string) => expanded.value.includes(invoiceId);

const loadItems = async ({ page }: ITableUpdateOptions) => {
  const query: IInvoiceQuery = {
    page,
    invoice_status: props.status || undefined,
    invoice_number: props.invoiceId || undefined,
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

  await invoiceStore.searchInvoices(query);
};

const getInvoiceItems = async (invoiceId: string) => {
  const existingInvoiceItems = getLoadedInvoiceItems(invoiceId);
  if (!existingInvoiceItems) {
    const tests = await invoiceStore.getInvoiceItems(invoiceId);
    invoiceItems.value[invoiceId] = tests;
  }
};

const toggleDetails = async (invoiceId: string) => {
  console.log(invoiceId);

  if (isExpanded(invoiceId)) {
    const index = expanded.value.findIndex((id) => id === invoiceId);
    expanded.value.splice(index, 1);
  } else {
    state.loadingDetailsId = invoiceId;
    try {
      await getInvoiceItems(invoiceId);
      expanded.value.push(invoiceId);
    } finally {
      state.loadingDetailsId = null;
    }
  }
};

const onEdit = async (invoiceId: string) => {};

const onViewReport = async (invoiceId: string) => {};

const onViewImage = async (invoiceId: string) => {};
</script>
