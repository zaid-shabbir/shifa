<template>
  <v-checkbox
    v-bind="$attrs"
    :label="label"
    :color="color"
    class="text-secondary"
    hide-details="auto"
  />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
  },
});
</script>

<style lang="scss">
.v-checkbox-btn {
  .v-label {
    opacity: 1;
  }
}
</style>
