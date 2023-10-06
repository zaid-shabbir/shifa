<template>
  <data-table-server
    v-model:page="page"
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
          {{ moment(item.raw.invoice_date).format('MMM DD, YYYY hh:mm a') }}
        </td>
        <td>
          {{ $money(item.raw.amount_paid, item.raw.currency?.code) }}
        </td>
        <td>
          {{ item.raw.currency?.name }}
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
            class="text-capitalize"
            :color="getStatusColor(item.raw.payment_method)"
          >
            {{ item.raw.payment_method }}
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
        </td>
      </tr>
    </template>
  </data-table-server>
</template>

<script setup lang="ts">
import { computed, ref, watch, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment-timezone';
import _ from 'lodash';

import DataTableServer from '../common/DataTableServer.vue';
import { usePaymentStore } from '@/store';
import { IPaymentQuery, ITableUpdateOptions } from '@/types';
import { $money } from '@/utils';

const props = defineProps({
  paymentId: {
    type: String,
    default: '',
  },
  paymentMethod: {
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

const paymentStore = usePaymentStore();

const headers = [
  {
    title: t('billing.payment_number'),
    key: 'payment_number',
    sortable: false,
  },
  {
    title: t('billing.payment_date'),
    key: 'payment_date',
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
    title: t('billing.method'),
    key: 'method',
    sortable: false,
  },
  {
    title: t('common.actions'),
    key: 'actions',
    sortable: false,
  },
];

const page = ref(1);
const search = ref('');

const searchResults = computed(() => {
  const results = _.cloneDeep(paymentStore.searchResults?.results || []).map(
    (result) => ({
      ...result,
      // v-datatable-server accepts only string for itemValue
      id: String(result.id),
    }),
  );

  return {
    ...paymentStore.searchResults,
    results,
  };
});

const getStatusColor = (status: string) => {
  if (!status) return;
  else if (status == 'card') return 'green';
  else if (status == 'cash') return 'blue';
  else return '';
};

const triggerSearch = () => {
  page.value = 1;
  search.value = String(Date.now());
};

watch(
  () => [
    props.paymentId,
    props.dates,
    props.paymentMethod,
    props.practitionerId,
  ],
  () => {
    triggerSearch();
  },
);

const loadItems = async ({ page }: ITableUpdateOptions) => {
  const query: IPaymentQuery = {
    page,
    payment_method: props.paymentMethod || undefined,
    payment_id: props.paymentId || undefined,
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

  await paymentStore.searchInvoices(query);
};

const onEdit = async (paymentId: string) => {};

const onViewReport = async (paymentId: string) => {};

const onViewImage = async (paymentId: string) => {};
</script>
