<template>
  <expansion-panel :title="title" :icon="icon" v-model="panel">
    <template #content>
      <v-sheet class="px-3 py-5 bordered">
        <auto-complete
          :placeholder="placeholder"
          :items="metaDataItems"
          v-model="selectedItem"
          :loading="loading"
          item-title="title"
          item-value="icd_code"
          v-model:search="searchKey"
          @update:search="searchUpdated"
          @keyup.enter="createEncounterItem"
        >
          <template #append>
            <v-tooltip :text="$t('encounters.my_codes')" location="top">
              <template v-slot:activator="{ props }">
                <switch-btn
                  v-bind="props"
                  :indeterminate="false"
                  v-model="isMyCodes"
                  class="mr-2"
                />
              </template>
            </v-tooltip>

            <btn
              icon="mdi-plus"
              icon-only
              :primary="false"
              size="small"
              variant="text"
              color="primary"
              @click="createEncounterItem"
            />
          </template>
        </auto-complete>

        <div class="ml-5 mt-3">
          <div
            v-for="(item, index) in encounterItems"
            :key="index"
            class="d-flex justify-space-between py-1"
          >
            <span class="text-subtitle-1"> • {{ getItemText(item) }} </span>
            <btn
              size="x-small"
              icon-only
              :primary="false"
              variant="text"
              icon="$delete"
              :loading="loading"
              @click="deleteEncounterItem(item)"
            >
            </btn>
          </div>
        </div>
      </v-sheet>
    </template>
  </expansion-panel>
</template>

<script setup lang="ts">
import { ref, computed, WritableComputedRef, PropType } from 'vue';
import _ from 'lodash';

import { useMetaDataStore, useEncounterStore, useAuthStore } from '@/store';
import {
  IEncounter,
  IEncounterItem,
  IMetaDataICDCode,
  IMetaDataICDCodeQuery,
} from '@/types';

const metaDataStore = useMetaDataStore();
const encounterStore = useEncounterStore();
const authStore = useAuthStore();

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  apiKey: {
    type: String,
    required: true,
  },
  encounterItems: {
    type: Array as PropType<IEncounterItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(['updated']);

const loading = ref<boolean>(false);
const metaDataItems = ref<(IMetaDataICDCode & { title: string })[]>([]);
const panel = ref<number | undefined>();
const selectedItem = ref<string>();
const searchKey = ref<string>('');
const isMyCodes = ref(true);

const currentEncounter: WritableComputedRef<IEncounter> = computed(() => {
  return encounterStore.currentEncounter;
});

const getItemText = (item: any) => {
  return props.apiKey && item[props.apiKey];
};

const searchMetaDataItems = _.debounce(async () => {
  const chunks = searchKey.value.split(':').map((chunk) => chunk.trim());

  const params: IMetaDataICDCodeQuery = {
    type: props.apiKey,
    name: chunks.length > 1 ? chunks[1] : chunks[0],
    code: chunks.length > 1 ? chunks[0] : undefined,
  };

  if (isMyCodes.value) {
    params.practitioner = authStore.userInfo.practitioner_id!;
  }

  const res = await metaDataStore.getMetaDataICDCodes(params);
  metaDataItems.value = (res || []).map((item) => ({
    ...item,
    title: `${item.icd_code}: ${item.short_description}`,
  }));
}, 600);

const searchUpdated = async (query: string) => {
  // vuetify bug, triggers update:search when toggling switch
  if (!query || query.length < 2 || ['true', 'false'].includes(query)) {
    return;
  }

  const currentItem = metaDataItems.value.find(
    (item) => item.icd_code === selectedItem.value,
  );
  if (query === currentItem?.title) {
    return;
  }

  searchMetaDataItems();
};

const clearInput = () => {
  searchKey.value = '';
  metaDataItems.value = [];
  selectedItem.value = undefined;
};

const createEncounterItem = () => {
  if (!currentEncounter.value.id || !selectedItem.value) return;

  loading.value = true;
  const payload: IEncounterItem = {
    encounter: currentEncounter.value.id,
    [props.apiKey]:
      typeof selectedItem.value == 'object'
        ? selectedItem.value[props.apiKey]
        : selectedItem.value,
  };
  encounterStore
    .addEncounterItem(payload, props.apiKey)
    .then(() => {
      emit('updated');
      clearInput();
    })
    .finally(() => (loading.value = false));
};

const deleteEncounterItem = (encounterItem: IEncounterItem) => {
  loading.value = true;
  encounterStore
    .deleteEncounterItem(encounterItem, props.apiKey)
    .then(() => {
      emit('updated');
    })
    .finally(() => (loading.value = false));
};
</script>

<style scoped></style>
