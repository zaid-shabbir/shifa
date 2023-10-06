<template>
  <div>
    <btn
      icon="$edit"
      icon-only
      :primary="false"
      size="small"
      variant="text"
      color="secondary"
      @click="$emit('edit')"
    />
    <btn
      icon="$delete"
      icon-only
      :primary="false"
      size="small"
      variant="text"
      color="secondary"
      :loading="isDeleting"
      @click="$emit('delete')"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  isDeleting: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
