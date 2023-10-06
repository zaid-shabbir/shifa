<template>
  <v-card
    class="shifa-panel"
    :class="{ 'no-border': noBorder, 'no-padding': noPadding }"
  >
    <v-expansion-panels v-model="panel">
      <v-expansion-panel variant="inset">
        <v-expansion-panel-title v-slot="{ expanded }">
          <div class="d-flex justify-space-between align-center w-full pr-5">
            <div class="d-flex align-center">
              <SvgLoader :icon="props.icon" v-if="props.icon" />
              <div class="text-h5 ml-5">{{ props.title }}</div>
            </div>
            <div>
              <div @click.stop="">
                <slot name="title-content" />
              </div>
              <div v-if="expanded" @click.stop="">
                <slot name="open-title-content" />
              </div>
            </div>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="">
          <v-divider class="mb-4" />
          <slot name="content" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { WritableComputedRef, computed } from 'vue';
import SvgLoader from '@/components/common/SvgLoader.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  noBorder: {
    type: Boolean,
    default: false,
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Number, Boolean],
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const panel: WritableComputedRef<number | boolean | undefined> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss">
.shifa-panel {
  .v-expansion-panel-title__overlay {
    background-color: unset;
  }

  .v-expansion-panel-title__icon i {
    font-size: 30px;
    color: #6064d8;
  }

  .v-expansion-panel-text__wrapper {
    padding-top: 0;
  }

  &.no-border {
    border: 0 !important;
  }

  &.no-padding {
    button {
      padding-left: 0;
      padding-right: 0;
    }

    .v-expansion-panel-text__wrapper {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &.v-card {
    overflow: unset;

    .v-expansion-panel {
      border-radius: 20px;

      .v-expansion-panel__shadow {
        box-shadow: none;
      }
    }
  }
}
</style>
