<template>
  <div class="d-flex flex-column fill-height w-100">
    <patient-profile
      v-if="patientStore.currentPatientId"
      :show-toggle="false"
      class="mb-4"
    />

    <appointment-top-bar
      v-model:date="date"
      v-model:practitioner-id="practitionerId"
      :practitioners="practitioners"
      @new-appointment="onShowNewAppointmentDialog"
    />
    <appointment-board />
    <new-appointment
      v-model="isShowNewAppointmentDialog"
      :practitioner-id="practitionerId"
      :current-appointment="currentAppointment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, ComputedRef, onBeforeUnmount } from 'vue';
import moment from 'moment-timezone';

import AppointmentTopBar from '@/components/appointments/AppointmentTopBar.vue';
import AppointmentBoard from '@/components/appointments/AppointmentBoard.vue';
import NewAppointment from '@/components/dialogs/NewAppointment.vue';
import PatientProfile from '@/components/patient-profile/PatientProfile.vue';

import {
  useFacilityAppointmentStore,
  useFacilityStore,
  usePatientStore,
  usePractitionerSearchStore,
} from '@/store';
import { AppointmentEvents, IAppointment, IPractitioner } from '@/types';
import { events } from '@/events';
import { watch } from 'vue';

const practitionerSearchStore = usePractitionerSearchStore();
const facilityStore = useFacilityStore();
const facilityAppointmentStore = useFacilityAppointmentStore();
const patientStore = usePatientStore();

const date = ref<Date>(moment.utc().toDate());
const isShowNewAppointmentDialog = ref(false);
const practitionerId = ref<string>();
const currentAppointment = ref<IAppointment | null>(null);

const practitioners: ComputedRef<IPractitioner[]> = computed(() => {
  return [
    {
      id: null,
      first_name: 'All',
      last_name: '',
    } as unknown as IPractitioner,
    ...practitionerSearchStore.practitioners,
  ];
});

onMounted(async () => {
  bindEventHandlers();

  await practitionerSearchStore.searchPractitioners({
    fuuid: facilityStore.currentFacilityId!,
  });
  await loadFacilityAppointments();
});

onBeforeUnmount(() => {
  unbindEventHandlers();
});

watch([date, practitionerId], () => {
  loadFacilityAppointments();
});

const loadFacilityAppointments = async () => {
  if (facilityStore.currentFacilityId) {
    await facilityAppointmentStore.searchFacilityAppointments(
      facilityStore.currentFacilityId,
      {
        date: moment.utc(date.value).format('YYYY-MM-DD'),
        practitioner_uuid: practitionerId.value || undefined,
      },
    );
  }
};

const bindEventHandlers = () => {
  events.on(
    AppointmentEvents.ShowAppointmentUpdateDialog,
    onShowUpdateAppointmentDialog,
  );
  events.on(AppointmentEvents.ReloadAppointments, loadFacilityAppointments);
};

const unbindEventHandlers = () => {
  events.off(
    AppointmentEvents.ShowAppointmentUpdateDialog,
    onShowUpdateAppointmentDialog,
  );
  events.off(AppointmentEvents.ReloadAppointments, loadFacilityAppointments);
};

const onShowNewAppointmentDialog = () => {
  currentAppointment.value = null;
  isShowNewAppointmentDialog.value = true;
};

const onShowUpdateAppointmentDialog = (appointment: IAppointment) => {
  currentAppointment.value = appointment;
  isShowNewAppointmentDialog.value = true;
};
</script>
