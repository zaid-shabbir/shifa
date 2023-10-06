<template>
  <text-field
    id="search"
    name="search"
    v-model="modelValue"
    :label="label || $t('common.search')"
    :placeholder="placeholder || $t('common.search')"
    @click:clear="handleSearch"
    @input="handleSearch"
  />
</template>

<script setup lang="ts">
import lodash from 'lodash';
import { WritableComputedRef, computed } from 'vue';

const emit = defineEmits(['search', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const modelValue: WritableComputedRef<string> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    handleSearch(value);
  },
});

const handleSearch = lodash.debounce((event) => {
  const value = event.target.value;
  emit('update:modelValue', value ? value.trim() : '');
}, 600);
</script>

<style lang="scss" scoped></style>
