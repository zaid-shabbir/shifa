<template>
  <v-autocomplete
    class="base-auto-complete-field"
    v-bind="$attrs"
    :flat="props.flat"
    :rounded="props.rounded"
    :density="props.density"
    :bg-color="props.bgColor"
    :variant="props.variant"
    hide-details="auto"
    :error-messages="errors"
    menu-icon="mdi-chevron-down"
  >
    <template
      v-for="(name, index) of slotNames"
      :key="index"
      #[name]="slotProps"
    >
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { computed, PropType, useSlots } from 'vue';
import { useCommonStore } from '@/store';

const slots = useSlots();
const slotNames = Object.keys(slots) as [];

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
.base-auto-complete-field {
  .v-field__append-inner {
    i {
      font-size: 30px;
      color: #6064d8;
    }
  }
}
</style>
