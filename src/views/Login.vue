<template>
  <v-row no-gutters class="h-screen bg-white-lilac-22">
    <v-col md="6" class="left-container d-flex align-end fill-height">
      <v-img src="../assets/images/login/doctor.png" />
    </v-col>
    <v-col md="6" class="right-container bg-white centered">
      <login-form />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/forms/LoginForm.vue';
</script>

<style lang="scss" scoped>
.left-container {
  background-image: url('../assets/images/login/shifa-logo-layer.png');
  background-size: contain;
  background-position-y: -1.25rem;
}

.right-container {
  border: 1px solid;
  border-color: rgb(var(--v-theme-link-water));
  border-radius: 60px 0px 0px 60px;
}
</style>
