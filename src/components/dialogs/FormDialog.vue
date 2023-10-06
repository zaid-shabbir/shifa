<template>
  <base-dialog
    v-model="isShowDialog"
    class="dialog-form"
    :show-footer="false"
    v-bind:="$attrs"
    @opened="$emit('opened')"
  >
    <template #header>
      <slot name="header" />
    </template>

    <template #content>
      <v-form v-model="isValidForm" @submit.prevent="submit">
        <slot />

        <v-divider class="my-4" />

        <v-row>
          <v-col class="d-flex align-center justify-end">
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
          </v-col>
        </v-row>
      </v-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { WritableComputedRef, computed, ref } from 'vue';

import { useCommonStore } from '@/store';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
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
const isValidForm = ref(false);

const onCancel = () => {
  isShowDialog.value = false;

  emit('cancel');
};

const submit = async (event: any) => {
  await commonStore.clearErrorOnSubmit();

  if (!isValidForm.value) {
    return;
  }

  emit('submit', event);
};
</script>

<style lang="scss"></style>
