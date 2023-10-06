<template>
  <v-sheet class="bordered overflow-hidden editor" height="250">
    <QuillEditor
      v-bind="$attrs"
      contentType="html"
      v-model:content="text"
      theme="snow"
    />
  </v-sheet>
</template>

<script setup lang="ts">
import { WritableComputedRef, computed, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

onMounted(async () => {});

const text: WritableComputedRef<string> = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emit('update:modelValue', value);
  },
});

// const updatedContent = (val: any) => {
//   console.log(val);
// };
</script>

<style scoped lang="scss"></style>
