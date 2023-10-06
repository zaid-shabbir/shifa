<template>
  <v-navigation-drawer width="268">
    <v-list
      nav
      density="compact"
      v-model:opened="opened"
      class="shifa-nav"
      :selected="selected"
    >
      <v-list-item
        prepend-icon="$dashboard"
        title="Dashboard"
        value="Dashboard"
        to="/dashboard"
        rounded="xl"
        elevation="0"
        variant="elevated"
        active-class="bg-primary active-nav dashboard"
      />

      <v-list-group
        v-for="{ pageId, name, icon, children } in computedSideBarItems"
        :key="pageId"
        :value="name"
        :prepend-icon="icon"
      >
        <template v-slot:activator="{ props }">
          <v-list-item class="font-weight-bold" v-bind="props" :title="name" />
        </template>

        <v-list-item
          v-for="child in children"
          :key="child.path || child.pageId"
          :value="child.name"
          :title="child.name"
          :to="child.path!"
          :disabled="!child.path"
          rounded="xl"
          elevation="0"
          variant="elevated"
          active-class="bg-primary active-nav"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { sideBarItems } from '@/constants';
import { usePatientStore } from '@/store';

const route = useRoute();
const patientStore = usePatientStore();

const opened = ref([]);
const selected = computed(() => [route.name]);

const computedSideBarItems = computed(() => {
  return sideBarItems.map((item) => {
    const children = item.children.map((child) => {
      if (!child.path.includes(':patientId')) {
        return child;
      }

      const path = patientStore.currentPatientId
        ? child.path.replace(':patientId', patientStore.currentPatientId!)
        : null;

      return {
        ...child,
        path,
      };
    });

    return {
      ...item,
      children,
    };
  });
});
</script>

<style lang="scss">
.shifa-nav {
  padding-left: 0;

  .active-nav {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;

    &.dashboard {
      .v-list-item__prepend > .v-icon {
        background-color: transparent;

        path {
          fill: white;
        }
      }
    }
  }

  .v-list-item--nav {
    .v-list-item-title {
      font-size: 14px;
      line-height: normal;
    }
  }

  .v-list-item__prepend > .v-icon {
    background-color: #f0f0fb;
    border-radius: 10px;
    width: 36px;
    height: 32px;

    & ~ .v-list-item__spacer {
      width: 20px;
    }
  }
}
</style>
