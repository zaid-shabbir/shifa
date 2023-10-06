<template>
  <div class="centered">
    <btn
      icon="mdi-chevron-left"
      color="primary"
      icon-only
      :disabled="!props.modelValue"
      @click="onChangeDate('prev')"
    />

    <btn class="ml-4" @click="onChangeDate('today')">
      {{ $t('common.today') }}
    </btn>

    <date-picker v-model="date" class="mx-4" />

    <btn
      icon="mdi-chevron-right"
      color="primary"
      icon-only
      :disabled="!props.modelValue"
      @click="onChangeDate('next')"
    />
  </div>
</template>

<script setup lang="ts">
import { WritableComputedRef, computed } from 'vue';
import moment from 'moment-timezone';

const props = defineProps({
  modelValue: {
    type: Date,
  },
});

const emit = defineEmits(['update:modelValue']);

const date: WritableComputedRef<Date | undefined> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const onChangeDate = (direction: 'next' | 'prev' | 'today') => {
  if (direction === 'next') {
    date.value = moment.utc(date.value).add(1, 'day').toDate();
  } else if (direction === 'prev') {
    date.value = moment.utc(date.value).subtract(1, 'day').toDate();
  } else {
    date.value = moment.utc().toDate();
  }
};
</script>
