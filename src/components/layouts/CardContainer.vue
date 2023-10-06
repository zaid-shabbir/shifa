<template>
  <v-card :prepend-icon="icon" class="shifa-card">
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>

    <template #append>
      <slot name="append" />
    </template>

    <v-divider class="mx-4" v-if="!!title" />

    <slot />
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.shifa-card {
  &.v-card {
    overflow: unset;
  }
}
</style>
