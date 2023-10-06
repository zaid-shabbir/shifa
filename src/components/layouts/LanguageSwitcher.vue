<template>
  <select-field
    :items="languages"
    item-title="title"
    item-value="value"
    v-model="$i18n.locale"
  >
    <template v-slot:selection="{ item }">
      <div class="d-flex align-center">
        <img :src="item.raw.icon" :alt="item.raw.icon" />
        <span class="ml-3">
          {{ item.title }}
        </span>
      </div>
    </template>
  </select-field>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ILanguageItem } from '@/types';
import EnglishIcon from '@/assets/icons/usa-flag.svg';

const { t } = useI18n();

const languages = ref<[ILanguageItem]>([
  { title: t('common.english'), value: 'en', icon: EnglishIcon },
]);

defineExpose({ languages });
</script>

<style lang="scss">
.base-text-field {
  .v-field__append-inner {
    i {
      font-size: 30px;
      color: #6064d8;
    }
  }
  .v-text-field input {
    color: #6064d8;
  }
}
</style>
