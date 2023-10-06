<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <div class="d-flex flex-1-1">
        <v-chip-group
          v-model="paymentMethodValue"
          class="text-primary pt-0"
          selected-class="bg-primary text-white"
        >
          <v-chip
            v-for="{ title, value } of paymentMethods"
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
          {{ $t('billing.new_payment') }}
        </btn>
      </div>
    </div>

    <div class="d-flex justify-space-between mb-3">
      <div class="d-flex flex-1-1 flex-wrap">
        <search
          v-model="paymentIdValue"
          :label="$t('billing.payment_number')"
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
  'update:paymentId',
  'update:dates',
  'update:paymentMethod',
  'update:practitionerId',
  'newInvoice',
]);

const props = defineProps({
  paymentId: {
    type: String,
  },
  dates: {
    type: Array as PropType<Date[]>,
    default: () => [],
  },
  paymentMethods: {
    type: Array as PropType<ISelect<string | null>[]>,
    default: () => [],
  },
  paymentMethod: {
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

const paymentIdValue: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.paymentId;
  },
  set(value) {
    emit('update:paymentId', value);
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

const paymentMethodValue: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.paymentMethod;
  },
  set(value) {
    emit('update:paymentMethod', value);
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
