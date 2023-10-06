<template>
  <v-container fluid class="detail-view">
    <v-row no-gutters>
      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.body_part') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.category') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.name') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.cpt_code') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.icd_10_code') }}:</div>
      </v-col>
    </v-row>

    <v-row v-for="(scanType, index) of scanTypes" :key="scanType.id" no-gutters>
      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === scanTypes.length - 1 }"
      >
        <div class="px-2">
          {{ scanType.body_part }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === scanTypes.length - 1 }"
      >
        <div class="px-2">
          {{ scanType.scan_category }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === scanTypes.length - 1 }"
      >
        <div class="px-2">
          {{ scanType.name }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === scanTypes.length - 1 }"
      >
        <div class="px-2">
          {{ scanType.CPT_code }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === scanTypes.length - 1 }"
      >
        <div class="d-flex align-items-center justify-space-between px-2">
          <div class="pr-2">
            {{ scanType.ICD_10_code }}
          </div>

          <div class="d-flex">
            <btn
              :primary="false"
              icon="mdi-square-edit-outline"
              icon-only
              icon-color="primary"
              variant="text"
              size="x-small"
              @click="onEdit(scanType.id)"
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
              @click="onDelete(scanType.id)"
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

import { IScan } from '@/types';

const props = defineProps({
  scans: {
    type: Array as PropType<IScan[]>,
    default: () => [],
  },
});

const scanTypes = computed(() => {
  return props.scans.map((scan) => scan.scan_type);
});

const onEdit = (scanId: number) => {};

const onDelete = (scanId: number) => {};
</script>
