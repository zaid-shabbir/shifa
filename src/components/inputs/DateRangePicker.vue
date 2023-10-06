<template>
  <date-picker
    :range="range"
    :multi-calendars="multiCalendars"
    :preset-dates="presetDates"
  >
    <template
      v-for="(name, index) of slotNames"
      :key="index"
      #[name]="slotProps"
    >
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </date-picker>
</template>

<script setup lang="ts">
import { useSlots, ref } from 'vue';
import moment from 'moment-timezone';

defineProps({
  range: {
    type: Boolean,
    default: true,
  },
  multiCalendars: {
    type: Boolean,
    default: true,
  },
});

const slots = useSlots();
const slotNames = Object.keys(slots) as [];

const now = moment.utc();
const presetDates = ref([
  {
    label: 'Today',
    value: [now.clone().toDate(), now.clone().toDate()],
  },
  {
    label: 'Yesterday',
    value: [
      now.clone().subtract(1, 'day').toDate(),
      now.clone().subtract(1, 'day').toDate(),
    ],
  },
  {
    label: 'This Week',
    value: [
      now.clone().startOf('week').toDate(),
      now.clone().endOf('week').toDate(),
    ],
  },
  {
    label: 'Last Week',
    value: [
      now.clone().subtract(1, 'week').startOf('week').toDate(),
      now.clone().subtract(1, 'week').endOf('week').toDate(),
    ],
  },
  {
    label: 'This Month',
    value: [
      now.clone().startOf('month').toDate(),
      now.clone().endOf('month').toDate(),
    ],
  },
  {
    label: 'Last Month',
    value: [
      now.clone().subtract(1, 'month').startOf('month').toDate(),
      now.clone().subtract(1, 'month').endOf('month').toDate(),
    ],
  },
]);
</script>

<style lang="scss" scoped></style>
