<template>
  <v-switch
    :color="color"
    :indeterminate="indeterminate"
    v-bind="$attrs"
    hide-details="auto"
    class="text-secondary"
  >
    <template
      v-for="(name, index) of slotNames"
      :key="index"
      #[name]="slotProps"
    >
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </v-switch>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  indeterminate: {
    type: Boolean,
    default: true,
  },
});
const attrs = useAttrs();
const slots = useSlots();
const slotNames = Object.keys(slots) as [];

const indeterminate = computed(() =>
  attrs.modelValue === undefined ? props.indeterminate : false,
);
</script>
