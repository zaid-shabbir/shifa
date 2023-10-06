<template>
  <v-tooltip :activator="activator" :location="location">
    <slot />
  </v-tooltip>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

// from vuetify
declare const block: readonly ['top', 'bottom'];
declare const inline: readonly ['start', 'end', 'left', 'right'];
type Tblock = (typeof block)[number];
type Tinline = (typeof inline)[number];
type Anchor =
  | Tblock
  | Tinline
  | 'center'
  | 'center center'
  | `${Tblock} ${Tinline | 'center'}`
  | `${Tinline} ${Tblock | 'center'}`;

defineProps({
  activator: {
    type: String,
    default: 'parent',
  },
  location: {
    type: String as PropType<NonNullable<Anchor> | undefined>,
    default: 'top',
  },
});
</script>
