<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <div class="d-flex flex-1-1">
        <v-chip-group
          v-model="labTestProfileValue"
          class="text-primary pt-0"
          selected-class="bg-primary text-white"
        >
          <v-chip
            v-for="testProfile of labTestProfiles"
            :key="testProfile.key"
            variant="outlined"
            size="large"
            :value="testProfile.key"
          >
            {{ testProfile.short_name }}
            <tooltip> {{ testProfile.name }} </tooltip>
          </v-chip>
        </v-chip-group>
      </div>

      <div>
        <btn
          icon="mdi-plus"
          :iconBefore="true"
          primary
          @click="$emit('newOrder')"
        >
          {{ $t('orders.new_order') }}
        </btn>
      </div>
    </div>

    <div class="d-flex justify-space-between mb-3">
      <div class="d-flex flex-1-1 flex-wrap">
        <select-field
          :items="statuses"
          v-model="statusValue"
          :label="$t('orders.statuses')"
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

import { IKeyNames, IPractitioner, ISelect } from '@/types';

const emit = defineEmits([
  'update:labTestProfile',
  'update:dates',
  'update:status',
  'update:practitionerId',
  'newOrder',
]);

const props = defineProps({
  labTestProfiles: {
    type: Array as PropType<IKeyNames[]>,
    default: () => [],
  },
  labTestProfile: {
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

const labTestProfileValue: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.labTestProfile;
  },
  set(value) {
    emit('update:labTestProfile', value);
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
