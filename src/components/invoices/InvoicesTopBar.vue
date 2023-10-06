<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <div class="d-flex flex-1-1">
        <v-chip-group
          v-model="statusValue"
          class="text-primary pt-0"
          selected-class="bg-primary text-white"
        >
          <v-chip
            v-for="{ title, value } of statuses"
            :key="value!"
            variant="outlined"
            size="large"
            :value="value"
          >
            {{ title }}
          </v-chip>
        </v-chip-group>
      </div>

      <div>
        <btn
          icon="mdi-plus"
          :iconBefore="true"
          primary
          @click="$emit('newInvoice')"
        >
          {{ $t('billing.new_invoice') }}
        </btn>
      </div>
    </div>

    <div class="d-flex justify-space-between mb-3">
      <div class="d-flex flex-1-1 flex-wrap">
        <search
          v-model="invoiceIdValue"
          :label="$t('billing.search_invoice')"
          class="max-width-250 mr-4"
        />

        <select-field
          :items="practitioners"
          :item-title="getPractitionerFullName"
          item-value="id"
          v-model="practitionerIdValue"
          :label="$t('orders.practitioners_doctors')"
          class="max-width-250 mr-4"
        />

        <div>
          <date-range-picker v-model="datesValue" class="align-start" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, WritableComputedRef } from 'vue';

import { IPractitioner, ISelect } from '@/types';

const emit = defineEmits([
  'update:invoiceId',
  'update:dates',
  'update:status',
  'update:practitionerId',
  'newInvoice',
]);

const props = defineProps({
  invoiceId: {
    type: String,
  },
  dates: {
    type: Array as PropType<Date[]>,
    default: () => [],
  },
  statuses: {
    type: Array as PropType<ISelect<string | null>[]>,
    default: () => [],
  },
  status: {
    type: String,
  },
  practitioners: {
    type: Array as PropType<IPractitioner[]>,
    default: () => [],
  },
  practitionerId: {
    type: String,
  },
});

const invoiceIdValue: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.invoiceId;
  },
  set(value) {
    emit('update:invoiceId', value);
  },
});

const datesValue: WritableComputedRef<Date[] | undefined> = computed({
  get() {
    return props.dates;
  },
  set(value) {
    emit('update:dates', value);
  },
});

const statusValue: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.status;
  },
  set(value) {
    emit('update:status', value);
  },
});

const practitionerIdValue: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.practitionerId;
  },
  set(value) {
    emit('update:practitionerId', value);
  },
});

const getPractitionerFullName = (practitioner: IPractitioner) =>
  `${practitioner.first_name} ${practitioner.last_name}`;
</script>
