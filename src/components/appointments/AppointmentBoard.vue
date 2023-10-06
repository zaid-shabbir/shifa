<template>
  <v-row class="mt-4">
    <v-col>
      <appointment-list
        title="New - Waiting"
        :value="newAppointments"
        :queue-status="QueueStatus.New"
        @update-appointment-action="updateAppointmentAction"
      />
    </v-col>

    <v-col>
      <appointment-list
        title="In Progress - Been seen"
        :value="inProgressAppointments"
        :queue-status="QueueStatus.InProgress"
        @update-appointment-action="updateAppointmentAction"
      />
    </v-col>

    <v-col>
      <appointment-list
        title="Done"
        :value="doneAppointments"
        :queue-status="QueueStatus.Done"
        @update-appointment-action="updateAppointmentAction"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import _ from 'lodash';

import {
  useAppointmentStore,
  useCommonStore,
  useFacilityAppointmentStore,
} from '@/store';
import AppointmentList from './AppointmentList.vue';
import {
  AppointmentAction,
  AppointmentEvents,
  IAppointment,
  QueueStatus,
  ToastType,
} from '@/types';
import { events } from '@/events';

const commonStore = useCommonStore();
const facilityAppointmentStore = useFacilityAppointmentStore();
const appointmentStore = useAppointmentStore();
const { t } = useI18n();

const allAppointments = computed(() => {
  return _.cloneDeep(facilityAppointmentStore.facilityAppointments)
    .sort((a, b) => a.appointment_number - b.appointment_number);
});

const newAppointments = computed(() => {
  return allAppointments.value.filter(
    (appointment) => appointment.queue_status === QueueStatus.New,
  );
});

const inProgressAppointments = computed(() => {
  return allAppointments.value.filter(
    (appointment) => appointment.queue_status === QueueStatus.InProgress,
  );
});

const doneAppointments = computed(() => {
  return allAppointments.value.filter(
    (appointment) => appointment.queue_status === QueueStatus.Done,
  );
});

const updateAppointmentAction = async (
  appointment: IAppointment,
  action: AppointmentAction,
) => {
  await appointmentStore
    .updateAppointmentAction(appointment.id, action)
    .then(() => {
      commonStore.showToast(
        ToastType.Success,
        t('appointments.update_appointment_success'),
      );
    })
    .catch((err) => err);

  events.emit(AppointmentEvents.ReloadAppointments);
};
</script>

<style lang="scss" scoped></style>
