<template>
  <v-snackbar
    top
    centered
    :color="color"
    :value="props.value"
    :timeout="props.timeout"
  >
    <div class="d-flex align-center">
      <v-icon class="mr-1">{{ icon }}</v-icon>
      {{ message }}
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ToastType } from '@/types';

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: ToastType.Info,
  },
  color: {
    type: String,
    default: '',
  },
  timeout: {
    type: Number,
    default: 4000,
  },
  icon: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
});

const icon = computed(() => {
  if (props.icon) {
    return props.icon;
  }

  let iconClass = '';
  switch (props.type) {
    case ToastType.Error:
      iconClass = 'mdi-alert-remove';
      break;
    case ToastType.Warning:
      iconClass = 'mdi-alert';
      break;
    case ToastType.Info:
      iconClass = 'mdi-information';
      break;
    case ToastType.Success:
      iconClass = 'mdi-check-circle';
      break;
  }

  return iconClass;
});

const color = computed(() => {
  if (props.color) {
    return props.color;
  }

  return props.type;
});
</script>
