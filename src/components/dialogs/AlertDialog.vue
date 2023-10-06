<template>
  <form-dialog v-model="isShowDialog" @submit="save">
    <template v-slot:header>
      <div class="text-primary">
        {{
          isCreateAction ? $t('patient.add_alert') : $t('patient.edit_alert')
        }}
      </div>
    </template>
    <v-row>
      <v-col cols="12">
        <select-field
          v-model="formData.flag"
          :items="alerts"
          :rules="[required]"
          item-title="name"
          item-value="id"
          :label="$t('patient.alert')"
          attr="alert"
        />
      </v-col>
      <v-col cols="12">
        <text-area
          v-model="formData.notes"
          :label="$t('patient.notes')"
          attr="notes"
          :rows="4"
        />
      </v-col>
    </v-row>
  </form-dialog>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  WritableComputedRef,
  PropType,
  watch,
} from 'vue';
import { required } from '@/utils/validations';
import {
  useCommonStore,
  usePatientStore,
  usePatientRecordStore,
} from '@/store';
import { IAlert, IPatientAlert, ToastType } from '@/types';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  alert: {
    type: Object as PropType<IPatientAlert>,
    default: () => {},
  },
  addedAlerts: {
    type: Array as PropType<IPatientAlert[]>,
    default: () => [],
  },
  isCreateAction: {
    type: Boolean,
    default: true,
  },
});

const commonStore = useCommonStore();
const patientStore = usePatientStore();
const patientRecordStore = usePatientRecordStore();

const { t } = useI18n();

const emit = defineEmits(['update:modelValue', 'refresh']);

const formData = ref<IPatientAlert>(<IPatientAlert>{});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue)
      if (props?.alert?.id)
        formData.value = {
          ...props.alert,
          id: props?.alert?.id,
        };
      else
        formData.value = {
          name: '',
          notes: '',
          is_active: true,
        };
  },
);

const isShowDialog: WritableComputedRef<boolean> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const alerts: WritableComputedRef<IAlert[] | undefined> = computed(() => {
  let tempAlerts = props.addedAlerts.map(
    (alert: IPatientAlert) => alert.flag && alert?.flag?.id,
  );

  return patientRecordStore.alerts.filter(
    (alert: IAlert) =>
      !tempAlerts.includes(alert.id) ||
      alert.id === (props.alert.flag && props.alert.flag.id),
  );
});

onMounted(async () => {
  await patientRecordStore.getAlerts();
});

const save = async () => {
  if (props.alert.id) {
    await patientRecordStore.updatePatientAlert(formData.value);
    commonStore.showToast(ToastType.Success, t('notifications.alert_updated'));
  } else {
    formData.value.patient = patientStore.currentPatientId;
    await patientRecordStore.addPatientAlert(formData.value);
    commonStore.showToast(ToastType.Success, t('notifications.alert_created'));
  }

  emit('refresh');
  isShowDialog.value = false;
};
</script>

<style scoped></style>
