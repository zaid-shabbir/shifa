<template>
  <v-app>
    <top-bar @menuClicked="isShowSidebar = !isShowSidebar" />
    <side-bar v-model="isShowSidebar" />
    <v-main>
      <v-container
        fluid
        class="bg-white-lilac-22 align-start justify-center fill-height"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TopBar from '@/components/layouts/TopBar.vue';
import SideBar from '@/components/layouts/SideBar.vue';

const isShowSidebar = ref(true);
</script>

<style scoped></style>
