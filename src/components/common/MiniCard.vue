<template>
  <v-card class="pa-3 pr-0" :width="width" :height="height">
    <div class="d-flex align-center">
      <svg-loader v-if="icon" :icon="icon" />
      <div class="ml-4">
        <div class="text-body-1 text-disabled">{{ title }}</div>
        <div class="text-h5 text-secondary">{{ text }}</div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: 'auto',
  },
  height: {
    type: String,
    default: 'auto',
  },
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped></style>
