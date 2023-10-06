<template>
  <v-card width="368" class="px-4 py-5">
    <v-row no-gutters>
      <v-col cols="6">
        <div class="text-body-1 text-disabled">
          {{ $t('dashboard.encounter_date') }}
        </div>
        <div class="text-h6 text-secondary font-weight-medium">
          {{ details.date }}
        </div>
      </v-col>
      <v-col cols="6">
        <div class="text-body-1 text-disabled">
          {{ $t('dashboard.type') }}
        </div>
        <div class="text-h6 text-secondary font-weight-medium">
          {{ details.type }}
        </div>
      </v-col>
      <v-col cols="6" class="mt-2">
        <div class="text-body-1 text-disabled">
          {{ $t('dashboard.code') }}
        </div>
        <div class="text-h6 text-secondary font-weight-medium">
          {{ details.code }}
        </div>
      </v-col>
      <v-col cols="6" class="mt-2">
        <div class="text-body-1 text-disabled">
          {{ $t('dashboard.problem') }}
        </div>
        <div class="text-h6 text-secondary font-weight-medium">
          {{ details.problem }}
        </div>
      </v-col>
      <v-col cols="12" class="mt-2">
        <div class="text-body-1 text-disabled">
          {{ $t('dashboard.notes') }}
        </div>
        <div class="text-h6 text-secondary font-weight-medium">
          {{ details.notes }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  details: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
