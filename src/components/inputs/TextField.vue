<template>
  <v-text-field
    class="base-text-field"
    v-bind="$attrs"
    :flat="props.flat"
    :rounded="props.rounded"
    :density="props.density"
    :bg-color="props.bgColor"
    :variant="props.variant"
    :type="type"
    hide-details="auto"
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
    type: String as PropType<
      null | 'default' | 'comfortable' | 'compact' | undefined
    >,
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
    type: String as PropType<
      | 'filled'
      | 'outlined'
      | 'plain'
      | 'underlined'
      | 'solo'
      | 'solo-inverted'
      | 'solo-filled'
      | undefined
    >,
    default: 'solo',
  },
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: 'on',
  },
  attr: {
    type: String,
    default: '',
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
.base-text-field {
  .v-text-field input {
    color: #9fa1b8;
  }
}
</style>
