<template>
  <div class="icon centered">
    <img v-if="icon" :src="svg" :alt="icon" />
    <v-icon v-else-if="mdiIcon" :icon="mdiIcon" />
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  mdiIcon: {
    type: String,
    default: '',
  },
});
const svg: ComputedRef<string> = computed(
  () => new URL(`../../assets/icons/${props.icon}.svg`, import.meta.url).href,
);
</script>

<style scoped lang="scss">
.icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: #f0f0fb;
}
</style>
