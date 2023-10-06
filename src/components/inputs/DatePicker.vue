<template>
  <vue-date-picker
    v-bind="$attrs"
    ref="datePickerRef"
    :range="range"
    :enable-time-picker="enableTimePicker"
    :timezone="timezone"
    :placeholder="placeholder"
    :required="required"
    :week-start="weekStart"
    :input-class-name="inputClassName"
    calendar-cell-class-name="dp-custom-cell"
    class="bg-light"
  >
    <template #input-icon>
      <v-icon icon="$calendar" class="ml-2" />
    </template>

    <template #clear-icon="{ clear }">
      <v-icon icon="mdi-close" color="primary" class="mr-2" @click="clear" />
    </template>

    <template #arrow-left>
      <left-arrow />
    </template>

    <template #arrow-right>
      <right-arrow />
    </template>

    <template #action-buttons>
      <div class="action-button cancel mr-2" @click="onCancel">
        {{ $t('common.cancel') }}
      </div>

      <div class="action-button ok mr-2" @click="onOk">
        {{ $t('common.ok') }}
      </div>
    </template>

    <template
      v-for="(name, index) of slotNames"
      :key="index"
      #[name]="slotProps"
    >
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </vue-date-picker>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useSlots, PropType, ref, computed } from 'vue';

import leftArrow from '@/assets/icons/left-arrow.svg?component';
import rightArrow from '@/assets/icons/right-arrow.svg?component';

const props = defineProps({
  range: {
    type: Boolean,
    default: false,
  },
  enableTimePicker: {
    type: Boolean,
    default: false,
  },
  timezone: {
    type: String,
    default: 'UTC',
  },
  placeholder: {
    type: String,
    default: 'Select Date',
  },
  required: {
    type: Boolean,
    default: false,
  },
  weekStart: {
    type: [Number, String] as PropType<
      '0' | '1' | '2' | '3' | '4' | '5' | '6' | 0 | 1 | 2 | 3 | 4 | 5 | 6
    >,
    default: 0,
  },
});

const slots = useSlots();
const slotNames = Object.keys(slots) as [];

const datePickerRef = ref();
const inputClassName = computed(
  () => `dp-custom-input ${props.range ? 'dp-custom-input-range' : ''}`,
);

const onCancel = () => {
  datePickerRef.value.closeMenu();
};

const onOk = () => {
  datePickerRef.value.selectDate();
};
</script>

<style lang="scss">
.dp__main {
  font-family: 'Poppins', sans-serif;
  border-radius: 20px;

  .dp-custom-input {
    font-size: 16px;
    background-color: transparent;
    border: 1px solid transparent;
    min-height: 47px;

    &.dp-custom-input-range {
      min-width: 250px;
    }
  }

  .dp--arrow-btn-nav {
    .dp__inner_nav {
      padding-top: 2px;
      width: 35px;
      height: 35px;
    }
  }

  .dp-custom-cell {
    border-radius: 50px;

    &.dp__today {
      border: 1px solid rgb(var(--v-theme-primary));
    }

    &.dp__active_date,
    &.dp__range_start,
    &.dp__range_end {
      background: rgb(var(--v-theme-primary));
    }
  }

  .action-button {
    cursor: pointer;

    padding: 4px 16px;
    border-radius: 20px;
    background-color: rgb(var(--v-theme-primary));
    color: white;

    &.cancel {
      background-color: white;
      color: rgb(var(--v-theme-primary));
      border: 1px solid rgb(var(--v-theme-primary));
    }
  }
}
</style>
