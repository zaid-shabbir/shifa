<template>
  <form-dialog v-model="isShowDialog" @submit="submit" @opened="dialogOpened">
    <template #header>
      {{
        currentAppointment
          ? t('appointments.update_appointment')
          : t('appointments.new_appointment')
      }}
    </template>

    <v-row>
      <v-col cols="12">
        <select-field
          v-model="formData.practitioner"
          :items="practitionerSearchStore.practitioners"
          :item-title="getPractitionerFullName"
          item-value="id"
          :label="$t('appointments.practitioners_doctors')"
          :rules="[required]"
          attr="practitioner"
          :disabled="!!currentAppointment"
        />
      </v-col>

      <v-col cols="12">
        <date-picker
          v-model="formData.appointment_date"
          enableTimePicker
          :label="$t('appointments.appointment_date')"
          :rules="[required]"
          required
          attr="appointment_date"
          :disabled="!!currentAppointment"
        />
      </v-col>

      <v-col cols="12">
        <text-field
          v-model="formData.duration_mins"
          type="number"
          min="0"
          step="5"
          :rules="[requiredPositiveNumber]"
          :label="$t('appointments.duration_mins')"
          attr="duration_mins"
          :disabled="!!currentAppointment"
        />
      </v-col>

      <v-col cols="12">
        <select-field
          v-model="formData.contact_method"
          :items="contactMethodsMock"
          :label="$t('appointments.contact_method')"
          :rules="[required]"
          attr="contact_method"
          :disabled="!!currentAppointment"
        />
      </v-col>

      <v-col cols="12">
        <text-field
          v-model="formData.appointment_purpose"
          :rules="[required]"
          :label="$t('appointments.appointment_purpose')"
          attr="appointment_purpose"
        />
      </v-col>

      <v-col cols="12">
        <text-area
          v-model="formData.notes"
          :label="$t('appointments.notes')"
          attr="notes"
        />
      </v-col>
    </v-row>
  </form-dialog>
</template>

<script setup lang="ts">
import { WritableComputedRef, reactive, computed, PropType } from 'vue';
import moment from 'moment-timezone';
import { useI18n } from 'vue-i18n';

import { required, requiredPositiveNumber } from '@/utils';
import {
  useCommonStore,
  useFacilityStore,
  usePatientAppointmentStore,
  usePatientStore,
  usePractitionerSearchStore,
} from '@/store';
import { contactMethodsMock } from '@/constants';
import {
  AppointmentEvents,
  IAppointment,
  IPractitioner,
  ToastType,
} from '@/types';
import { events } from '@/events';

const commonStore = useCommonStore();
const practitionerSearchStore = usePractitionerSearchStore();
const patientStore = usePatientStore();
const facilityStore = useFacilityStore();
const patientAppointmentStore = usePatientAppointmentStore();

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  practitionerId: {
    type: String,
    default: null,
  },
  currentAppointment: {
    type: Object as PropType<IAppointment | null>,
    default: null,
  },
});

const isShowDialog: WritableComputedRef<boolean> = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const formData = reactive<{
  practitioner?: string;
  appointment_date?: Date;
  duration_mins?: number;
  contact_method?: number;
  appointment_purpose?: string;
  notes?: string;
}>({});

const dialogOpened = () => {
  if (props.currentAppointment) {
    // update appointment
    formData.practitioner = props.currentAppointment.practitioner.id;
    formData.appointment_date = moment
      .utc(props.currentAppointment.appointment_date)
      .toDate();
    formData.duration_mins = props.currentAppointment.duration_mins;
    formData.contact_method = props.currentAppointment.contact_method;
    formData.appointment_purpose = props.currentAppointment.appointment_purpose;
    formData.notes = props.currentAppointment.notes;
  } else {
    // new appointment
    if (props.practitionerId) {
      formData.practitioner = props.practitionerId;
    } else if (practitionerSearchStore.practitioners.length === 1) {
      formData.practitioner = practitionerSearchStore.practitioners[0].id;
    }

    formData.appointment_date = moment.utc().toDate();
    formData.duration_mins = 15;
    formData.contact_method = undefined;
    formData.appointment_purpose = undefined;
    formData.notes = undefined;
  }
};

const getPractitionerFullName = (practitioner: IPractitioner) =>
  `${practitioner.first_name} ${practitioner.last_name}`;

const submit = async () => {
  if (props.currentAppointment) {
    await patientAppointmentStore.updatePatientAppointment(
      props.currentAppointment.patient.id,
      props.currentAppointment.id,
      {
        notes: formData.notes,
        appointment_purpose: formData.appointment_purpose,
      },
    );
  } else {
    await patientAppointmentStore.registerPatientAppointment({
      patient: patientStore.currentPatientId!,
      facility: facilityStore.currentFacilityId!,
      practitioner: formData.practitioner!,
      appointment_date: moment
        .utc(formData.appointment_date)
        .format('YYYY-MM-DDTHH:mm:ss'),
      duration_mins: formData.duration_mins!,
      contact_method: formData.contact_method!,
      appointment_purpose: formData.appointment_purpose!,
      notes: formData.notes!,
    });
  }
  events.emit(AppointmentEvents.ReloadAppointments);

  commonStore.showToast(
    ToastType.Success,
    props.currentAppointment
      ? t('appointments.update_appointment_success')
      : t('patient.register_patient_appointment_success'),
  );

  isShowDialog.value = false;
};
</script>

<style lang="scss" scoped></style>
