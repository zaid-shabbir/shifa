<template>
  <div class="centered">
    <date-navigator v-model="dateValue" />

    <select-field
      :items="practitioners"
      :item-title="getPractitionerFullName"
      item-value="id"
      v-model="practitionerIdValue"
      :label="$t('appointments.practitioners_doctors')"
      class="practitioners-doctors ml-10 mr-4"
    />

    <btn
      icon="mdi-plus"
      :iconBefore="true"
      primary
      @click="$emit('newAppointment')"
      :disabled="
        !facilityStore.currentFacilityId || !patientStore.currentPatientId
      "
    >
      {{ $t('appointments.new_appointment') }}
    </btn>
  </div>
</template>

<script lang="ts" setup>
import { WritableComputedRef, computed, PropType } from 'vue';
import DateNavigator from '@/components/inputs/DateNavigator.vue';
import { IPractitioner } from '@/types';
import { useFacilityStore, usePatientStore } from '@/store';

const emit = defineEmits([
  'update:date',
  'newAppointment',
  'update:practitionerId',
]);

const props = defineProps({
  date: {
    type: Date,
  },
  practitioners: {
    type: Array as PropType<IPractitioner[]>,
    default: () => [],
  },
  practitionerId: {
    type: String,
  },
});

const facilityStore = useFacilityStore();
const patientStore = usePatientStore();

const dateValue: WritableComputedRef<Date | undefined> = computed({
  get() {
    return props.date;
  },
  set(value) {
    emit('update:date', value);
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

<style lang="scss" scoped>
.practitioners-doctors {
  max-width: 250px;
}
</style>
