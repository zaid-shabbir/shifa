<template>
  <v-container fluid class="detail-view">
    <v-row no-gutters>
      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('billing.item') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('billing.unit_price') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('billing.quantity') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('billing.amount') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('billing.discount_amount') }}:</div>
      </v-col>

      <v-col class="detail-view-th">
        <div class="px-2">{{ $t('billing.total_amount') }}:</div>
      </v-col>
    </v-row>

    <v-row
      v-for="(invoiceItem, index) of invoiceItems"
      :key="invoiceItem.id"
      no-gutters
    >
      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === invoiceItems.length - 1 }"
      >
        <div class="px-2">
          {{ invoiceItem.product_name }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === invoiceItems.length - 1 }"
      >
        <div class="px-2">
          {{ $money(invoiceItem.item_price, invoiceItem.currency?.code) }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === invoiceItems.length - 1 }"
      >
        <div class="px-2">
          {{ invoiceItem.quantity }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === invoiceItems.length - 1 }"
      >
        <div class="px-2">
          {{ $money(invoiceItem.item_amount, invoiceItem.currency?.code) }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === invoiceItems.length - 1 }"
      >
        <div class="px-2">
          {{
            $money(invoiceItem.item_discount_amount, invoiceItem.currency?.code)
          }}
        </div>
      </v-col>

      <v-col
        class="detail-view-td"
        :class="{ 'last-child': index === invoiceItems.length - 1 }"
      >
        <div class="d-flex align-items-center justify-space-between px-2">
          <div class="pr-2">
            {{
              $money(invoiceItem.item_amount_total, invoiceItem.currency?.code)
            }}
          </div>

          <div class="d-flex">
            <btn
              :primary="false"
              icon="mdi-square-edit-outline"
              icon-only
              icon-color="primary"
              variant="text"
              size="x-small"
              @click="onEdit(invoiceItem.id)"
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
              @click="onDelete(invoiceItem.id)"
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

import { IInvoiceItem } from '@/types';
import { $money } from '@/utils';

const props = defineProps({
  items: {
    type: Array as PropType<IInvoiceItem[]>,
    default: () => [],
  },
});

const invoiceItems = computed(() => {
  return props.items;
});

const onEdit = (invoiceItemId: number) => {};

const onDelete = (invoiceItemId: number) => {};
</script>
