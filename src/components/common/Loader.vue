<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" class="mt-10 text-center mx-auto">
        <v-progress-circular
          :class="{ 'mt-16': props.size == 100 }"
          :size="size"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 60,
  },
});
</script>
