<template>
  <data-table-server
    v-if="!loading"
    class="patient-measures-table"
    :headers="measureHeaders"
    :items="patientMeasureValues"
    :show-search-results-info="false"
  >
    <template v-slot:top>
      <select-field
        :items="measureTypes"
        v-model="measureType"
        item-title="title"
        item-value="key"
        class="measures-type-select mt-5 ml-5"
      ></select-field>
    </template>
    <template #item.measure="{ item }">
      <h3 class="pb-0">{{ item?.selectable?.measure }}</h3>
      <span class="text-subtitle-2 text-disabled">{{
        item?.selectable?.unit
      }}</span>
    </template>

    <template #item.today="{ item }">
      <text-field
        v-if="!loading"
        v-model="todaysMeasureValues[item.index].value"
        variant="solo-filled"
        type="number"
        class="measure-value-input"
        @input.capture="onMeasureValueChange(todaysMeasureValues[item.index])"
      />
    </template>
  </data-table-server>
</template>
<script setup lang="ts">
import { onMounted, ref, ComputedRef, computed, watch } from 'vue';
import DataTableServer from '../common/DataTableServer.vue';
import _ from 'lodash';
import moment from 'moment-timezone';
import { usePatientStore, usePatientMeasureStore } from '@/store';
import {
  IPatientMeasureValue,
  ITodayeMeasureValue,
  ITableHeader,
} from '@/types';

const { getPatientMeasures, addPatientMeasure } = usePatientMeasureStore();
const patientStore = usePatientStore();

const loading = ref<boolean>(true);
const patientMeasureValues = ref<IPatientMeasureValue[]>([]);

const measureType = ref<string>('vitals');

const measureHeaders = ref<ITableHeader[]>([]);

const todaysDate = ref<string>('');

const todaysMeasureValues = ref<ITodayeMeasureValue[]>([]);

const currentPatientId: ComputedRef<string | null> = computed(() => {
  return patientStore.currentPatientId;
});

const measureTypes = [
  {
    title: 'Gynecology',
    key: 'gynecology',
  },
  {
    title: 'Vitals',
    key: 'vitals',
  },
];

watch(
  () => measureType.value,
  () => {
    getAllMeasures();
  },
);

// Adding new measure values for selected patient
const onMeasureValueChange = _.debounce((payload: ITodayeMeasureValue) => {
  addPatientMeasure(payload);
}, 750);

const getAllMeasures = async () => {
  loading.value = true;

  // Clearing table column headers, measure values for refetching
  measureHeaders.value = [];
  patientMeasureValues.value = [];
  todaysMeasureValues.value = [];

  if (currentPatientId.value) {
    // Fetching columns and values for patient measurements
    const { column_headers, data } = await getPatientMeasures(
      currentPatientId.value,
      measureType.value,
    );

    // Assigning table column headers
    _.forEach(column_headers, (val: ITableHeader) => {
      measureHeaders.value.push({
        title: val.name,
        name: val.name,
        key:
          todaysDate.value !== val.name
            ? val.name.toLocaleLowerCase()
            : 'today',
        sortable: false,
      });
    });

    // Assigning values
    _.forEach(data, (val: IPatientMeasureValue, index: number) => {
      let dateValueString = val.data.includes(todaysDate.value)
        ? val.data.replaceAll(todaysDate.value, 'today')
        : val.data;
      let dateValueParsed = JSON.parse(dateValueString);

      patientMeasureValues.value.push({
        id: val.id,
        measure_type: val.measure_type,
        measure: val.name,
        unit: val.unit,
        ...dateValueParsed,
      });

      // Assigning todays values for editing input
      todaysMeasureValues.value.push({
        measure: val.id,
        value: dateValueParsed['today'],
        is_abnormal: false,
        patient: currentPatientId.value!,
        index,
      });
    });

    loading.value = false;
  }
};

onMounted(async () => {
  todaysDate.value = moment.utc().format('YYYY-MM-DD');
  await getAllMeasures();
});
</script>
<style lang="scss">
.patient-measures-table {
  padding-right: 0;
  padding-left: 0;
  border-radius: 20px !important;

  .v-select {
    width: 150px;
  }

  th {
    min-width: 117px;
  }

  .measure-value-input {
    width: 150px;
  }
}
</style>
