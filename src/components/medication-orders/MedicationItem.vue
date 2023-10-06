<template>
  <v-container fluid class="detail-view">
    <v-row no-gutters>
      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.medication_name') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.dosage') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.frequency') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.route') }}:</div>
      </v-col>
    </v-row>

    <v-row
      v-for="(medicationItem, index) of medicationItems"
      :key="medicationItem.id"
      no-gutters
    >
      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === medicationItems.length - 1 }"
      >
        <div class="px-2">
          {{ medicationItem.medication_name }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === medicationItems.length - 1 }"
      >
        <div class="px-2">
          {{ medicationItem.dosage }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === medicationItems.length - 1 }"
      >
        <div class="px-2">
          {{ medicationItem.frequency }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === medicationItems.length - 1 }"
      >
        <div class="d-flex align-items-center justify-space-between px-2">
          <div class="pr-2">{{ medicationItem.route }}</div>

          <div class="d-flex">
            <btn
              :primary="false"
              icon="mdi-square-edit-outline"
              icon-only
              icon-color="primary"
              variant="text"
              size="x-small"
              @click="onEdit(medicationItem.id)"
            >
              <tooltip>{{ $t('common.edit') }}</tooltip>
            </btn>

            <btn
              :primary="false"
              icon="$delete"
              icon-only
              icon-color="primary"
              variant="text"
              size="x-small"
              @click="onDelete(medicationItem.id)"
            >
              <tooltip>{{ $t('common.delete') }}</tooltip>
            </btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';

import { IMedicationOrderItem } from '@/types';

const props = defineProps({
  items: {
    type: Array as PropType<IMedicationOrderItem[]>,
    default: () => [],
  },
});

const medicationItems = computed(() => {
  return props.items.map(
    (item: IMedicationOrderItem) => item.medication_variation,
  );
});

const onEdit = (testId: number) => {};

const onDelete = (testId: number) => {};
</script>
