<template>
  <expansion-panel
    :title="$t('dashboard.appointments')"
    icon="appointment"
    v-model="panel"
  >
    <template #title-content>
      <v-btn-toggle v-model="timeline" mandatory group>
        <btn value="past"> {{ $t('dashboard.past') }} </btn>
        <btn value="upcoming"> {{ $t('dashboard.upcoming') }} </btn>
      </v-btn-toggle>
      <btn class="ml-3"> {{ $t('dashboard.schedule_new_appointment') }} </btn>
    </template>
    <template #content> Appointments Content </template>
  </expansion-panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const timeline = ref('past');
const panel = ref<number | undefined>();
</script>

<style lang="scss" scoped></style>
