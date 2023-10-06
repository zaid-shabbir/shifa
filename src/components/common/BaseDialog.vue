<template>
  <v-dialog
    v-model="isShowDialog"
    :max-width="maxWidth"
    :width="width"
    :persistent="persistent"
    v-bind:="$attrs"
  >
    <v-card>
      <v-card-title class="">
        <div class="pa-4 apart">
          <div class="text-h5 text-primary flex-1-1">
            <slot name="header" />
          </div>
          <btn
            icon="mdi-close"
            icon-only
            :primary="false"
            size="small"
            variant="text"
            color="primary"
            @click="isShowDialog = false"
          >
          </btn>
        </div>
        <v-divider class="mx-4" />
      </v-card-title>
      <v-card-text class="">
        <div class="pa-2 pb-4">
          <slot name="content" />
        </div>
      </v-card-text>

      <template v-if="showFooter">
        <v-divider class="mx-4" />

        <v-card-text class="px-4 w-full apart">
          <slot name="footer"> </slot>
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { WritableComputedRef, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [String, Number],
    default: 'auto',
  },
  maxWidth: {
    type: [String, Number],
    default: '500px',
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue', 'opened', 'closed']);

const isShowDialog: WritableComputedRef<boolean> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

watch(isShowDialog, (value) => {
  if (value) {
    emit('opened');
  } else {
    emit('closed');
  }
});
</script>

<style scoped></style>
