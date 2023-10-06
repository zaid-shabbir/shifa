<template>
  <v-container fluid class="detail-view">
    <v-row no-gutters>
      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.specimen_type') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.test_name') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.name_arabic') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('orders.name_short') }}:</div>
      </v-col>
    </v-row>

    <v-row v-for="(labTest, index) of labTests" :key="labTest.id" no-gutters>
      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === labTests.length - 1 }"
      >
        <div class="px-2">
          {{ labTest.specimen_type }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === labTests.length - 1 }"
      >
        <div class="px-2">
          {{ labTest.name }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === labTests.length - 1 }"
      >
        <div class="px-2">
          {{ labTest.name_arabic }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === labTests.length - 1 }"
      >
        <div class="d-flex align-items-center justify-space-between px-2">
          <div class="pr-2">
            {{ labTest.name_short }}
          </div>

          <div class="d-flex">
            <btn
              :primary="false"
              icon="mdi-square-edit-outline"
              icon-only
              icon-color="primary"
              variant="text"
              size="x-small"
              @click="onEdit(labTest.id)"
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
              @click="onDelete(labTest.id)"
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

import { ILabOrderTest } from '@/types';

const props = defineProps({
  tests: {
    type: Array as PropType<ILabOrderTest[]>,
    default: () => [],
  },
});

const labTests = computed(() => {
  return props.tests.map((test) => test.lab_test);
});

const onEdit = (testId: number) => {};

const onDelete = (testId: number) => {};
</script>
