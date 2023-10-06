<template>
  <v-container fluid :class="{ 'px-0': noGutters }">
    <v-row v-if="showSearchResultsInfo">
      <v-col class="d-flex align-center">
        <div class="text-h6 text-secondary mr-2">
          {{ $t('common.search_results') }}
        </div>
        <div class="text-body-1 text-disabled">
          {{ itemsLength }} {{ $t('common.results') }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table-server
          v-model:page="pageValue"
          v-model:expanded="expandedValue"
          :items-per-page="itemsPerPage"
          :items-length="itemsLength"
          :item-value="itemValue"
          :loading="commonStore.isLoading"
          @update:options="$emit('update:optitons', $event)"
          v-bind:="$attrs"
          class="data-table-server bordered-min"
        >
          <template
            v-for="(name, index) of slotNames"
            :key="index"
            #[name]="slotProps"
          >
            <slot :name="name" v-bind="slotProps || {}" />
          </template>

          <template #bottom>
            <!-- Hide the default pagination -->
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-pagination
          v-model="pageValue"
          :length="pageLength"
          rounded="circle"
          size="28"
          variant="flat"
          active-color="primary"
          class="data-table-server-pagination"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useSlots, computed, WritableComputedRef } from 'vue';

import { useCommonStore } from '@/store';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import { PropType } from 'vue';

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  itemsLength: {
    type: Number,
    default: 0,
  },
  itemValue: {
    type: String,
    default: 'id',
  },
  expanded: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  noGutters: {
    type: Boolean,
    default: false,
  },
  showSearchResultsInfo: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:optitons', 'update:page', 'update:expanded']);

const slots = useSlots();
const commonStore = useCommonStore();

const slotNames = Object.keys(slots) as [];

const pageValue: WritableComputedRef<number> = computed({
  get() {
    return props.page;
  },
  set(value) {
    emit('update:page', value);
  },
});

const expandedValue: WritableComputedRef<string[]> = computed({
  get() {
    return props.expanded;
  },
  set(value) {
    emit('update:expanded', value);
  },
});

const pageLength = computed(() => {
  return Math.ceil(props.itemsLength / props.itemsPerPage);
});
</script>

<style lang="scss">
.data-table-server {
  &.v-table > .v-table__wrapper > table > thead > tr,
  &.v-table .v-table__wrapper > table > tbody > tr,
  &.v-table .v-table__wrapper > table > tr {
    td,
    th,
    label,
    .v-btn__content,
    .v-field {
      font-size: 14px;
    }

    td,
    th {
      color: rgb(var(--v-theme-secondary));
    }
  }

  &.v-table .v-table__wrapper > table > tbody > tr > td {
    position: relative;
  }

  &.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td {
    &:first-child::before,
    &:last-child::before {
      content: '';
      position: absolute;
      height: 1px;
      width: 16px;
      background-color: white;
      bottom: -1px;
    }

    &:first-child::before {
      left: 0;
    }

    &:last-child::before {
      right: 0;
    }
  }

  .detail-view {
    background-color: rgb(var(--v-theme-white-lilac-22));

    .detail-view-th,
    .detail-view-td {
      &.detail-view-th {
        font-weight: 500;
      }

      &.detail-view-td {
        padding-top: 12px;
      }

      &:not(.last-child) {
        padding-bottom: 12px;
        border-bottom: thin solid
          rgba(var(--v-border-color), var(--v-border-opacity));
      }
    }
  }
}

.data-table-server-pagination {
  .v-pagination__item:not(.v-pagination__item--is-active) {
    .v-btn.rounded-circle:not(.v-btn--disabled) {
      color: rgb(var(--v-theme-primary));

      .v-btn__underlay {
        border: 1px solid rgb(var(--v-theme-primary));
        border-radius: 50%;
      }
    }
  }

  .v-btn--disabled {
    .v-btn__overlay {
      background-color: transparent;
    }
  }
}
</style>
