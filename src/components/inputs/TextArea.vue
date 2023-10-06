<template>
  <v-textarea
    class="base-text-area"
    v-bind="$attrs"
    :flat="flat"
    :rounded="rounded"
    :density="density"
    :bg-color="bgColor"
    :variant="variant"
    hide-details="auto"
    :rows="rows"
    :error-messages="errors"
    :autocomplete="autocomplete"
  />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { useCommonStore } from '@/store';

const commonStore = useCommonStore();

const props = defineProps({
  rounded: {
    type: Boolean,
    default: true,
  },
  density: {
    type: String as PropType<null | 'default' | 'comfortable' | 'compact' | undefined>,
    default: 'compact',
  },
  bgColor: {
    type: String,
    default: 'light',
  },
  flat: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String as PropType<'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | undefined>,
    default: 'solo',
  },
  autocomplete: {
    type: String,
    default: 'on',
  },
  attr: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 2,
  },
  errorMessages: {
    type: [Array, String],
    default: '',
  },
});

const errors: any = computed(
  () =>
    props.errorMessages ||
    (commonStore.error?.data && commonStore.error.data[props.attr]) ||
    '',
);
</script>

<style lang="scss">
.base-text-area {
  .v-text-field input {
    color: #9fa1b8;
  }

  .v-field {
    border-radius: 10px;
  }
}
</style>
