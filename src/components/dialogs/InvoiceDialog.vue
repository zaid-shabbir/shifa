<template>
  <form-dialog
    v-model="isShowDialog"
    max-width="1000px"
    width="1000px"
    class="invoice-dialog"
    @submit="submit"
    @opened="dialogOpened"
  >
    <template #header>{{ $t('billing.invoice') }}</template>

    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center">
          <div class="mr-3 text-h5">{{ $t('billing.bill_to') }}</div>

          <auto-complete
            :placeholder="$t('billing.search_patient')"
            :items="patients"
            v-model="formData.patient"
            item-title="patient_name"
            item-value="id"
            :rules="[required]"
            class="text-primary mr-3"
            @update:search="patientSearchUpdated"
            @update:modelValue="patientUpdated"
          />

          <auto-complete
            :placeholder="$t('billing.search_encounter')"
            :items="patientEncounters"
            v-model="formData.encounter"
            item-title="name"
            item-value="id"
            :rules="[required]"
            class="text-primary"
          />
        </div>
      </v-col>
      <v-divider class="mx-3" />

      <v-col cols="12">
        <div class="text-h5">{{ $t('billing.invoice_items') }}</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="item of headers" :key="item.title" :class="item.class">
        <div class="font-weight-medium">
          {{ item.title }}
        </div>
      </v-col>
    </v-row>

    <v-row v-for="(invoice, i) of invoiceItems" :key="i">
      <invoice-item
        :products="invoiceStore.products"
        :index="i"
        v-model:product-id="invoiceItems[i].productId"
        v-model:quantity="invoiceItems[i].quantity"
        v-model:price="invoiceItems[i].price"
        v-model:currency="invoiceItems[i].currency"
        v-model:amount="invoiceItems[i].amount"
        v-model:discount="invoiceItems[i].discount"
        @delete:invoiceItem="deleteInvoiceItem"
        @update:amount="amountUpdated"
      />
    </v-row>

    <v-row>
      <v-col cols="12" class="apart">
        <btn icon="mdi-plus" :iconBefore="true" primary @click="addInvoiceItem">
          {{ $t('billing.add_item') }}
        </btn>
        <div class="total-amount">
          {{ `${$t('billing.total_amount')}: ${totalAmount}` }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <text-area v-model="formData.notes" :label="$t('patient.notes')" />
      </v-col>
    </v-row>
  </form-dialog>
</template>

<script setup lang="ts">
import { WritableComputedRef, reactive, computed, ref, PropType } from 'vue';
import moment from 'moment-timezone';
import _ from 'lodash';
import NP from 'number-precision';
import { useI18n } from 'vue-i18n';

import { required } from '@/utils';
import {
  useCommonStore,
  usePatientSearchStore,
  useEncounterStore,
  useInvoiceStore,
  useFacilityStore,
  useAuthStore,
} from '@/store';
import { IEncounter, IInvoiceItemRow, ToastType, IPatient } from '@/types';
import InvoiceItem from '../billings/InvoiceItem.vue';

const commonStore = useCommonStore();
const patientSearchStore = usePatientSearchStore();
const encounterStore = useEncounterStore();
const invoiceStore = useInvoiceStore();
const facilityStore = useFacilityStore();
const authStore = useAuthStore();

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  currentPatient: {
    type: Object as PropType<IPatient>,
  },
  currentEncounter: {
    type: Object as PropType<IEncounter>,
  },
});

const isShowDialog: WritableComputedRef<boolean> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const headers: {
  title: string;
  class?: string;
}[] = [
  {
    title: t('billing.item_name'),
    class: 'invoice-item-name',
  },
  {
    title: t('billing.quantity'),
    class: 'invoice-item',
  },
  {
    title: t('billing.price'),
    class: 'invoice-item-price',
  },
  {
    title: t('billing.currency'),
    class: 'invoice-item',
  },
  {
    title: t('billing.amount'),
    class: 'invoice-item-price',
  },
  {
    title: t('billing.discount'),
    class: 'invoice-item-price',
  },
  {
    // delete
    title: '',
  },
];

const formData = reactive<{
  patient?: string;
  encounter?: string;
  notes?: string;
}>({});
const invoiceItems = ref<IInvoiceItemRow[]>([]);
const totalAmount = ref(0);

const patients = ref<IPatient[]>([]);
const patientSearchKey = ref<string>('');

const patientEncounters = ref<(IEncounter & { name: string })[]>([]);

const searchPatients = _.debounce(async () => {
  const res = await patientSearchStore.searchPatients({
    query: patientSearchKey.value,
  });

  patients.value = res.results || [];
}, 600);

const patientSearchUpdated = async (query: string) => {
  const currentPatient = patients.value.find(
    (patient) => patient.id === formData.patient,
  );
  if (!query || query === currentPatient?.patient_name) {
    return;
  }

  patientSearchKey.value = query;
  searchPatients();
};

const searchEncounters = async () => {
  if (!formData.patient) {
    return;
  }

  const encounters = await encounterStore.getPatientEncounters(
    formData.patient,
    false,
  );
  patientEncounters.value = encounters.map((encounter) => ({
    ...encounter,
    name: `${encounter.encounter_type.name} on ${moment
      .utc(encounter.encounter_date)
      .format('YYYY-MM-DD')}`,
  }));
};

const patientUpdated = async () => {
  patientEncounters.value = [];
  formData.encounter = undefined;

  searchEncounters();
};

const getProducts = async () => {
  if (facilityStore.currentFacilityId) {
    await invoiceStore.getProducts(facilityStore.currentFacilityId);
  }
};

const deleteInvoiceItem = (index: number) => {
  invoiceItems.value.splice(index, 1);
};

const addInvoiceItem = () => {
  invoiceItems.value.push({});
};

const amountUpdated = () => {
  totalAmount.value = NP.strip(
    invoiceItems.value.reduce(
      (prev, current) => prev + (current.amount || 0),
      0,
    ),
  );
};

const clearFormData = () => {
  if (props.currentPatient) {
    patients.value = [props.currentPatient];
    formData.patient = props.currentPatient.id;
  } else {
    formData.patient = undefined;
  }

  if (props.currentEncounter) {
    patientEncounters.value = [
      {
        ...props.currentEncounter,
        name: `${props.currentEncounter.encounter_type.name} on ${moment
          .utc(props.currentEncounter.encounter_date)
          .format('YYYY-MM-DD')}`,
      },
    ];
    formData.encounter = props.currentEncounter.id;
  } else {
    formData.encounter = undefined;
  }

  formData.notes = undefined;
  invoiceItems.value = [{}];
};

const dialogOpened = async () => {
  clearFormData();

  await getProducts();
};

const submit = async () => {
  if (!invoiceItems.value.length) {
    commonStore.showToast(
      ToastType.Error,
      t('billing.please_add_invoice_items'),
    );

    return;
  }

  const currencies = _.uniq(
    invoiceItems.value.map((invoice) => invoice.currency),
  );
  if (currencies.length > 1) {
    commonStore.showToast(
      ToastType.Error,
      t('billing.only_one_currency_allowed'),
    );

    return;
  }

  await invoiceStore.createInvoice(facilityStore.currentFacilityId!, {
    patient: formData.patient!,
    facility: facilityStore.currentFacilityId!,
    practitioner: authStore.userInfo.practitioner_id!,
    encounter: formData.encounter!,
    currency: currencies[0]!,
    invoice_items: invoiceItems.value.map((invoiceItem) => ({
      product: invoiceItem.productId!,
      quantity: invoiceItem.quantity!,
      item_price: invoiceItem.price!,
      item_discount_amount: invoiceItem.discount!,
      currency: invoiceItem.currency!,
    })),
  });

  commonStore.showToast(
    ToastType.Success,
    t('billing.successfully_created_invoice'),
  );

  isShowDialog.value = false;
};
</script>

<style lang="scss">
.invoice-dialog {
  .invoice-item {
    flex-basis: 8%;
  }

  .invoice-item-name {
    flex-basis: 16%;
  }

  .invoice-item-price {
    flex-basis: 10%;
  }

  .total-amount {
    margin-right: 270px;
  }
}
</style>
