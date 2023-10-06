<template>
  <v-app-bar flat white height="78" id="shifa-top-bar" align-center>
    <v-app-bar-nav-icon @click="$emit('menuClicked')" />
    <v-app-bar-title>
      <router-link to="/">
        <v-img width="112" height="43" :src="logo" />
      </router-link>
    </v-app-bar-title>

    <v-sheet position="relative">
      <div class="search">
        <PatientSearch />
      </div>
    </v-sheet>

    <v-sheet class="ml-4">
      <btn icon="mdi-plus" :iconBefore="true" primary to="/register/patient"
        >{{ $t('register_patient.register_patient') }}
      </btn>
    </v-sheet>

    <v-sheet width="184px" class="ml-8">
      <LanguageSwitcher />
    </v-sheet>

    <v-sheet class="ml-4">
      <Notifications />
    </v-sheet>

    <v-sheet class="mx-4">
      <UserMenu />
    </v-sheet>
  </v-app-bar>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo/logo-english.svg';
import PatientSearch from '@/components/patient/PatientSearch.vue';
import LanguageSwitcher from '@/components/layouts/LanguageSwitcher.vue';
import Notifications from '@/components/layouts/Notifications.vue';
import UserMenu from '@/components/layouts/UserMenu.vue';
</script>

<style lang="scss" scoped>
#shifa-top-bar {
  background: #fff;
  overflow: visible;
  border: 1px solid #dce2f1;
}

.search {
  position: absolute;
  right: 0;
  top: -30px;
}
</style>
