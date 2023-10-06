<template>
  <v-btn
    v-bind="$attrs"
    :color="color"
    :icon="!!iconOnly"
    :variant="variant"
    :disabled="isDisabled"
    class="text-h6 font-weight-medium"
    :class="{ 'base-button': !iconOnly }"
  >
    <v-icon
      v-if="iconOnly"
      :size="iconSize"
      :color="iconColor"
      :icon="props.icon"
    />

    <v-icon
      v-else-if="icon && iconBefore && !iconOnly"
      class="mr-1"
      :color="iconColor"
      :icon="props.icon"
      :size="iconSize"
    />

    <slot />

    <v-icon
      v-if="icon && !iconBefore && !iconOnly"
      class="ml-1"
      :color="iconColor"
      :icon="props.icon"
      :size="iconSize"
    />
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCommonStore } from '@/store';

const commonStore = useCommonStore();

const props = defineProps({
  primary: {
    type: Boolean,
    default: true,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'primary',
  },
  iconColor: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  iconBefore: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: String,
    default: 'large',
  },
  variant: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const isDisabled = computed(() => props.disabled || commonStore.isLoading);

const variant: any = computed(() =>
  props.primary ? 'flat' : props.secondary ? 'outlined' : props.variant,
);
</script>

<style scoped>
.base-button {
  padding: 10px 30px;
  border-radius: 70px;
  height: auto !important;
}
</style>
