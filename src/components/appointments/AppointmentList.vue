<template>
  <card-container class="mx-4">
    <template #title>
      <div class="d-flex align-center">
        <div class="mr-2">
          {{ title }}
        </div>
        <v-chip size="x-small" color="primary">
          {{ value.length }}
        </v-chip>
      </div>
    </template>

    <draggable
      :list="value"
      group="appointment-list"
      itemKey="name"
      class="list-group w-100 px-4 my-4"
      ghost-class="ghost"
      @change="onDraggableChange"
      :disabled="commonStore.isLoading"
    >
      <template #item="{ element: appointment }">
        <div
          class="profile bg-white my-2 pa-2 cursor-pointer"
          :class="getAppointmentStatusClass(appointment)"
          @click="onDraggableClick(appointment)"
        >
          <div class="d-flex justify-space-between px-2 pt-1 pb-2">
            <div class="text-h6 text-secondary">
              {{ getAppointmentPatientFullName(appointment) }}
              <v-chip size="x-small" color="primary" class="ml-2">
                {{ appointment.appointment_number }}
              </v-chip>
            </div>

            <v-menu v-if="menuItems.length > 0">
              <template v-slot:activator="{ props }">
                <btn
                  v-bind="props"
                  icon="mdi-menu"
                  icon-only
                  :primary="false"
                  size="small"
                  variant="text"
                  color="primary"
                />
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in menuItems"
                  :key="i"
                  @click="onMenuClick(appointment, item.value)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-divider />

          <div class="d-flex align-center pa-4">
            <v-icon
              color="primary"
              :icon="
                appointment.patient?.gender === 'M'
                  ? 'mdi-face-man'
                  : 'mdi-face-woman'
              "
            />
            <div class="ml-5">
              <div class="text-body-1 text-disabled mr-3">
                {{ getAppointmentPatientAge(appointment) }}
                <v-chip
                  size="x-small"
                  :color="
                    appointment.patient?.gender == 'M' ? 'primary' : 'error'
                  "
                >
                  {{
                    appointment.patient?.gender == 'M'
                      ? $t('patient.male')
                      : $t('patient.female')
                  }}
                </v-chip>
              </div>
              <div class="text-body-1 text-disabled">
                {{ getAppointmentPractitionerFullName(appointment) }}
              </div>
            </div>
          </div>
          <v-divider />

          <div class="d-flex justify-end align-center px-2 pb-1 pt-2">
            <btn
              :primary="false"
              icon="mdi-medication-outline"
              icon-only
              variant="text"
              size="x-small"
              icon-size="default"
              @click="onEncounter(appointment.patient)"
            >
              <tooltip>
                {{ t('appointment_list.encounter') }}
              </tooltip>
            </btn>
            <btn
              :primary="false"
              icon="$patient-injury"
              icon-only
              variant="text"
              size="x-small"
              icon-size="default"
              @click="onViewProfile(appointment.patient)"
            >
              <tooltip>
                {{ t('appointment_list.profile') }}
              </tooltip>
            </btn>
          </div>
        </div>
      </template>
    </draggable>
  </card-container>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import draggable from 'vuedraggable';
import moment from 'moment-timezone';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import {
  AppointmentAction,
  AppointmentEvents,
  AppointmentStatus,
  IAppointment,
  IDraggableEvent,
  IPatient,
  ISelect,
  QueueStatus,
} from '@/types';
import { useCommonStore, usePatientStore } from '@/store';
import { events } from '@/events';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  value: {
    type: Array as PropType<IAppointment[]>,
    required: true,
  },
  queueStatus: {
    type: Number as PropType<QueueStatus>,
    required: true,
  },
});

const emit = defineEmits(['updateAppointmentAction']);

const { t } = useI18n();
const commonStore = useCommonStore();
const patientStore = usePatientStore();
const router = useRouter();

const menuItems = computed(() => {
  const items: ISelect<string>[] = [];

  if (props.queueStatus === QueueStatus.New) {
    items.push(
      {
        title: t('appointments.cancel'),
        value: AppointmentAction.Cancel,
      },
      {
        title: t('appointments.confirm'),
        value: AppointmentAction.Confirm,
      },
    );
  }

  return items;
});

const getAppointmentPatientFullName = (appointment: IAppointment) => {
  return `${appointment.patient?.first_name} ${appointment.patient?.last_name}`;
};

const getAppointmentPractitionerFullName = (appointment: IAppointment) => {
  return `${appointment.practitioner?.first_name} ${appointment.practitioner?.last_name}`;
};

const getAppointmentStatusClass = (appointment: IAppointment) => {
  switch (appointment.appointment_status) {
    case AppointmentStatus.New:
      return 'appointment-status-new';
    case AppointmentStatus.Confirmed:
      return 'appointment-status-confirmed';
    case AppointmentStatus.Cancelled:
      return 'appointment-status-cancelled';
    case AppointmentStatus.NoShow:
      return 'appointment-status-no-show';
  }
};

const getAppointmentPatientAge = (appointment: IAppointment) => {
  const age = moment
    .utc()
    .diff(moment.utc(appointment.patient?.date_of_birth), 'years');
  return `${age} years`;
};

const onDraggableChange = (event: IDraggableEvent<IAppointment>) => {
  if (!event.added || props.queueStatus === QueueStatus.New) {
    return;
  }

  // disallow moving from New to Done
  if (
    props.queueStatus === QueueStatus.Done &&
    event.added.element?.queue_status === QueueStatus.New
  ) {
    return;
  }

  // diallow moving from Done to In Progress
  if (
    props.queueStatus === QueueStatus.InProgress &&
    event.added.element?.queue_status === QueueStatus.Done
  ) {
    return;
  }

  const action =
    props.queueStatus === QueueStatus.InProgress
      ? AppointmentAction.Checkin
      : AppointmentAction.Checkout;
  emit('updateAppointmentAction', event.added.element, action);
};

const onMenuClick = (appointment: IAppointment, action: string) => {
  if (
    [AppointmentAction.Cancel, AppointmentAction.Confirm].includes(
      action as AppointmentAction,
    )
  ) {
    emit('updateAppointmentAction', appointment, action);
  }
};

const onEncounter = async (patient: IPatient) => {
  if (patient) {
    patientStore.setCurrentPatient(patient);

    router.push('/medical-records/encounter-notes');
  }
};

const onViewProfile = async (patient: IPatient) => {
  if (patient) {
    patientStore.setCurrentPatient(patient);

    router.push('/patients/profile');
  }
};

const onDraggableClick = async (appointment: IAppointment) => {
  events.emit(AppointmentEvents.ShowAppointmentUpdateDialog, appointment);
};
</script>

<style lang="scss" scoped>
.list-group {
  height: calc(100vh - 280px);
  overflow: auto;

  .profile {
    border-radius: 8px;
    border: 1px solid #dce2f1;

    &.appointment-status-new {
      padding-left: 15px !important;
    }

    &.appointment-status-confirmed {
      border-left: 8px solid rgb(var(--v-theme-success));
    }

    &.appointment-status-cancelled {
      border-left: 8px solid rgb(var(--v-theme-warning));
    }

    &.appointment-status-no-show {
      border-left: 8px solid rgb(var(--v-theme-error));
    }
  }
}
</style>
