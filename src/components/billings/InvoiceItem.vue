<template>
  <v-col class="invoice-item-name">
    <auto-complete
      v-model="productIdValue"
      :items="products"
      item-title="product_name"
      item-value="id"
      :placeholder="$t('billing.select_item')"
      :rules="[required]"
      class="text-primary"
    />
  </v-col>

  <v-col class="invoice-item">
    <text-field
      v-model="quantityValue"
      type="number"
      min="0"
      :rules="[requiredPositiveNumber]"
    />
  </v-col>

  <v-col class="invoice-item-price">
    <text-field v-model="priceValue" :rules="[requiredPositiveNumber]" />
  </v-col>

  <v-col class="invoice-item d-flex align-center">
    {{ currencyValue ? currencyValue.toUpperCase() : '' }}
  </v-col>

  <v-col class="invoice-item-price d-flex align-center">
    <div>
      {{ amountValue }}
    </div>
  </v-col>

  <v-col class="invoice-item-price">
    <text-field
      v-model="discountValue"
      :rules="[lessThanOrEqual(cost, $t('billing.invalid_discount'))]"
    />
  </v-col>

  <v-col class="centered">
    <btn
      size="default"
      icon-only
      :primary="false"
      variant="text"
      icon="$delete"
      color="primary"
      @click="$emit('delete:invoiceItem', index)"
    />
  </v-col>
</template>

<script setup lang="ts">
import { IProduct } from '@/types';
import { computed, PropType, WritableComputedRef, watch } from 'vue';
import NP from 'number-precision';

import { required, requiredPositiveNumber, lessThanOrEqual } from '@/utils';

const props = defineProps({
  products: {
    type: Array as PropType<IProduct[]>,
    default: () => [],
  },
  index: {
    type: Number,
  },
  productId: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  'update:productId',
  'update:quantity',
  'update:price',
  'update:currency',
  'update:amount',
  'update:discount',
  'delete:invoiceItem',
]);

const productIdValue: WritableComputedRef<number | undefined> = computed({
  get() {
    return props.productId;
  },
  set(value) {
    emit('update:productId', value);
  },
});

const quantityValue: WritableComputedRef<number | undefined> = computed({
  get() {
    return props.quantity;
  },
  set(value) {
    emit('update:quantity', Number(value));
  },
});

const priceValue: WritableComputedRef<number | undefined> = computed({
  get() {
    return props.price;
  },
  set(value) {
    emit('update:price', Number(value));
  },
});

const currencyValue: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.currency;
  },
  set(value) {
    emit('update:currency', value);
  },
});

const cost = computed(() => {
  return NP.strip((quantityValue.value || 0) * (priceValue.value || 0));
});

const amountValue = computed(() => {
  const amount = NP.strip(cost.value - (discountValue.value || 0));
  emit('update:amount', amount);

  return amount;
});

const discountValue: WritableComputedRef<number | undefined> = computed({
  get() {
    return props.discount;
  },
  set(value) {
    emit('update:discount', Number(value));
  },
});

watch(
  () => props.productId,
  () => {
    const product = props.products.find((p) => p.id === props.productId);
    if (!product) {
      return;
    }

    quantityValue.value = 1;
    priceValue.value = Number(product.price);
    currencyValue.value = product.currency;
    discountValue.value = 0;
  },
);
</script>

<style scoped lang="scss"></style>
