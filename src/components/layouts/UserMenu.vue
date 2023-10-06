<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="user-pic-container cursor-pointer">
        <img v-if="url" :src="url" alt="Profile Picture" />
        <v-icon v-else icon="mdi-account" />
      </div>
    </template>
    <v-list>
      <v-list-item @click="logout">
        <v-list-item-title>{{ $t('layouts.logout') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const url =
  'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const logout = () => {
  console.log('log out here');
};
</script>

<style scoped></style>
