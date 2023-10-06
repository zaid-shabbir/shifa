<template>
  <base-dialog
    v-model="isShowDialog"
    class="dialog-form"
    width="400"
    :show-footer="false"
    @opened="$emit('opened')"
  >
    <template #header>
      <div class="d-flex align-center">
        <v-icon :icon="icon" :color="color" size="40" class="mr-2"></v-icon><div class="text-primary">{{ title }}</div>
      </div>
    </template>

    <template #content>
      <v-form @submit.prevent="submit">
        <p class="py-4">{{ message }}</p>

        <v-divider class="my-4" />

        <v-row justify="end" class="my-1 px-3">
          <btn class="mr-4" :primary="false" secondary @click="onCancel">
            <slot name="cancel-button">
              {{ $t('common.cancel') }}
            </slot>
          </btn>

          <btn
            primary
            type="submit"
            :loading="commonStore.isLoading"
            :disabled="isDisabled || commonStore.isLoading"
          >
            <slot name="submit-button">
              {{ $t('common.submit') }}
            </slot>
          </btn>
        </v-row>
      </v-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { WritableComputedRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCommonStore } from '@/store';
import { DialogType } from '@/types';

const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: DialogType.Info,
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: () => useI18n()?.t('common.are_you_sure'),
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'submit', 'cancel', 'opened']);
const commonStore = useCommonStore();

const isShowDialog: WritableComputedRef<boolean> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const icon = computed(() => {
  if (props.icon) {
    return props.icon;
  }

  let iconClass = '';
  switch (props.type) {
    case DialogType.Danger:
      iconClass = 'mdi-alert-remove';
      break;
    case DialogType.Warning:
      iconClass = 'mdi-alert';
      break;
    case DialogType.Info:
      iconClass = 'mdi-information';
      break;
  }

  return iconClass;
});

const title = computed(() => {
  if (props.title) {
    return props.title;
  }

  let defaultTitle = '';
  switch (props.type) {
    case DialogType.Danger:
      defaultTitle = t('common.danger');
      break;
    case DialogType.Warning:
      defaultTitle = t('common.warning');
      break;
    case DialogType.Info:
      defaultTitle = t('common.info');
      break;
  }

  return defaultTitle;
});

const color = computed(() => {
  if (props.color) {
    return props.color;
  }

  return 'primary';
});

const onCancel = () => {
  isShowDialog.value = false;

  emit('cancel');
};

const submit = async (event: any) => {
  await commonStore.clearErrorOnSubmit();

  emit('submit', event);
};
</script>

<style lang="scss"></style>
