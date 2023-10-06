<template>
  <Loader v-if="loading" />
  <div v-else>
    <v-card v-if="props.vertical" class="pa-6">
      <div class="d-flex">
        <div class="user-pic-container-large">
          <img
            v-if="patientRecord.image"
            :src="patientRecord.image"
            :alt="patientRecord.first_name"
          />
          <SvgLoader
            v-else
            :mdi-icon="
              patientRecord.gender && patientRecord.gender.code == 'M'
                ? 'mdi-face-man'
                : 'mdi-face-woman'
            "
          />
        </div>
        <div class="ml-4 d-flex justify-space-between flex-grow-1">
          <div>
            <div class="text-h5 text-secondary">
              {{ patientRecord.title }}
              {{ patientRecord.first_name + ' ' + patientRecord.last_name }}
            </div>
            <div class="text-body-1 text-disabled mt-n1">
              {{ patientRecord.age }} {{ $t('patient.years') }}
            </div>
            <v-chip
              v-if="patientRecord.gender && patientRecord.gender.code"
              size="x-small"
              class="mt-n1"
              :color="patientRecord.gender.code == 'M' ? 'primary' : 'error'"
            >
              {{
                patientRecord.gender.code == 'M'
                  ? $t('patient.male')
                  : $t('patient.female')
              }}
            </v-chip>
          </div>
          <div v-if="showToggle" class="d-flex">
            <div
              @click="$emit('toggle')"
              class="bordered-min action-icon centered cursor-pointer"
            >
              <v-icon icon="mdi-dock-top" />
            </div>
            <!-- <div class="bordered-min action-icon centered cursor-pointer ml-3">
              <v-icon icon="$email" />
            </div>
            <div class="bordered-min action-icon centered cursor-pointer ml-3">
              <v-icon icon="$phone" />
            </div> -->
          </div>
        </div>
      </div>
      <div
        class="mt-3 d-flex justify-space-between text-h6 text-secondary font-weight-medium"
      >
        <div>{{ $t('patient_record.id') }}: {{ patientRecord.health_id }}</div>
        <div>
          {{
            patientRecord.preferred_language &&
            patientRecord.preferred_language.name
          }}
        </div>
      </div>
      <div class="text-body-1 text-disabled mt-n1">
        {{ $t('patient_record.last_visit') }}:
        {{ patientRecord.last_visit || $t('common.unknown') }}
      </div>
      <div class="mb-1">
        <btn
          icon="$info"
          icon-only
          :primary="false"
          size="small"
          variant="text"
          color="primary"
        >
        </btn>
        <btn
          icon="$chat"
          icon-only
          :primary="false"
          size="small"
          variant="text"
          color="primary"
        >
          <v-tooltip activator="parent" location="top"> Notes </v-tooltip>
        </btn>
        <btn
          icon="$smoking"
          icon-only
          :primary="false"
          size="small"
          variant="text"
          color="primary"
        >
          <v-tooltip activator="parent" location="top">
            {{
              patientRecord.smoking_status && patientRecord.smoking_status.name
            }}
          </v-tooltip>
        </btn>
        <btn
          icon="$wine"
          icon-only
          :primary="false"
          size="small"
          variant="text"
          color="primary"
        >
          <v-tooltip activator="parent" location="top">
            {{
              patientRecord.drinking_status &&
              patientRecord.drinking_status.name
            }}
          </v-tooltip>
        </btn>
      </div>
      <v-divider />
      <expansion-panel
        :title="$t('patient_record.allergies')"
        icon="medical-notes-4"
        v-model="panels.allergies"
        no-border
        no-padding
      >
        <template #title-content>
          <div class="d-flex align-center">
            <btn
              icon="$add"
              icon-only
              :primary="false"
              size="small"
              variant="text"
              color="secondary"
              @click="addAllergy"
            />

            <v-badge
              v-if="
                patientRecord.patient_allergies &&
                patientRecord.patient_allergies.length
              "
              class="ml-4"
              :content="patientRecord.patient_allergies.length"
              color="error"
            />
          </div>
        </template>

        <template #content>
          <div
            v-for="(allergy, index) in patientRecord.patient_allergies"
            :key="index"
            class="d-flex justify-space-between align-center"
          >
            <span class="text-h6 text-secondary font-weight-medium">
              {{ allergy.allergy && allergy.allergy.name }}
            </span>
            <EditDelete
              @edit="editAllergy(allergy)"
              @delete="openAllergyDeleteDialog(allergy)"
              :isDeleting="deleting == allergy.id"
            />
          </div>
        </template>
      </expansion-panel>
      <v-divider />
      <expansion-panel
        :title="$t('patient_record.alerts')"
        icon="medical-personnel-info"
        v-model="panels.alerts"
        no-border
        no-padding
      >
        <template #title-content>
          <div class="d-flex align-center">
            <btn
              icon="$add"
              icon-only
              :primary="false"
              size="small"
              variant="text"
              color="secondary"
              @click="addAlert"
            />

            <v-badge
              v-if="
                patientRecord.patient_flags &&
                patientRecord.patient_flags.length
              "
              class="ml-4"
              :content="patientRecord.patient_flags.length"
              color="error"
            />
          </div>
        </template>
        <template #content>
          <div
            v-for="(flag, index) in patientRecord.patient_flags"
            :key="index"
            class="d-flex justify-space-between align-center"
          >
            <span class="text-h6 text-secondary font-weight-medium">
              {{ flag.flag && flag.flag.name }}
            </span>
            <EditDelete
              @edit="editAlert(flag)"
              @delete="openAlertDeleteDialog(flag)"
            />
          </div>
        </template>
      </expansion-panel>
      <v-divider />
      <expansion-panel
        :title="$t('patient_record.vitals')"
        icon="medical-files-medical-check"
        v-model="panels.vitals"
        no-border
        no-padding
      >
        <template #content>
          <div class="apart text-h6 text-secondary font-weight-medium">
            <div>
              {{ $t('patient_record.pulse_rate') }}:
              {{ 'patientRecord.pulse_rate' }}
            </div>
            <EditDelete />
          </div>
          <div class="apart text-h6 text-secondary font-weight-medium">
            <div>
              {{ $t('patient_record.body_height') }}:
              {{ 'patientRecord.body_height' }}
            </div>
            <EditDelete />
          </div>
          <div class="apart text-h6 text-secondary font-weight-medium">
            <div>
              {{ $t('patient_record.blood_pressure') }}:
              {{ 'patientRecord.blood_pressure' }}
            </div>
            <EditDelete />
          </div>
          <div class="apart text-h6 text-secondary font-weight-medium">
            <div>
              {{ $t('patient_record.oxigen_sat') }}:
              {{ 'patientRecord.oxigen_sat' }}
            </div>
            <EditDelete />
          </div>
          <div class="apart text-h6 text-secondary font-weight-medium">
            <div>
              {{ $t('patient_record.body_weight') }}:
              {{ 'patientRecord.body_weight' }}
            </div>
            <EditDelete />
          </div>
          <div class="apart text-h6 text-secondary font-weight-medium">
            <div>
              {{ $t('patient_record.bmi_index') }}:
              {{ 'patientRecord.bmi_index' }}
            </div>
            <EditDelete />
          </div>
        </template>
      </expansion-panel>
      <v-divider />
      <div class="mt-4 text-h5 text-secondary">
        {{ $t('patient_record.messages') }}
      </div>
      <text-field
        class="mt-3"
        append-inner-icon="mdi-send"
        :label="$t('patient_record.write_message')"
      >
      </text-field>
    </v-card>
    <v-card v-else class="pa-3 d-flex flex-wrap">
      <div class="user-pic-container-large">
        <img
          v-if="patientRecord.image"
          :src="patientRecord.image"
          :alt="patientRecord.first_name"
        />
        <SvgLoader
          v-else
          :mdi-icon="
            patientRecord.gender && patientRecord.gender.code == 'M'
              ? 'mdi-face-man'
              : 'mdi-face-woman'
          "
        />
      </div>
      <div class="ml-4">
        <div class="d-flex align-center">
          <div class="text-h5 text-secondary">
            {{ patientRecord.title }}
            {{ patientRecord.first_name + ' ' + patientRecord.last_name }}
          </div>
          <v-chip
            v-if="patientRecord.gender && patientRecord.gender.code"
            size="x-small"
            class="ml-3"
            :color="patientRecord.gender.code == 'M' ? 'primary' : 'error'"
          >
            {{
              patientRecord.gender.code == 'M'
                ? $t('patient.male')
                : $t('patient.female')
            }}
          </v-chip>
        </div>
        <div class="text-body-1 text-disabled mt-n1">
          {{ patientAge }} {{ $t('patient.years') }}
        </div>
        <div class="mt-n2 ml-n3">
          <btn
            icon="$info"
            icon-only
            :primary="false"
            size="small"
            variant="text"
            color="primary"
          >
          </btn>
          <btn
            icon="$chat"
            icon-only
            :primary="false"
            size="small"
            variant="text"
            color="primary"
          >
            <v-tooltip activator="parent" location="top"> Notes </v-tooltip>
          </btn>
          <btn
            icon="$smoking"
            icon-only
            :primary="false"
            size="small"
            variant="text"
            color="primary"
          >
            <v-tooltip activator="parent" location="top">
              {{
                patientRecord.smoking_status &&
                patientRecord.smoking_status.name
              }}
            </v-tooltip>
          </btn>
          <btn
            icon="$wine"
            icon-only
            :primary="false"
            size="small"
            variant="text"
            color="primary"
          >
            <v-tooltip activator="parent" location="top">
              {{
                patientRecord.drinking_status &&
                patientRecord.drinking_status.name
              }}
            </v-tooltip>
          </btn>
        </div>
      </div>
      <v-divider vertical class="mx-6" />
      <div>
        <div class="text-h6 text-secondary font-weight-medium">
          {{ $t('patient_record.id') }}: {{ patientRecord.health_id }}
        </div>
        <div class="text-body-1 text-disabled">
          {{ $t('patient_record.last_visit') }}:
          {{ patientRecord.last_visit || $t('common.unknown') }}
        </div>
        <div class="text-h6 text-secondary font-weight-medium">
          {{
            patientRecord.preferred_language &&
            patientRecord.preferred_language.name
          }}
        </div>
      </div>
      <v-divider vertical class="mx-6" />
      <div class="d-flex align-center allergies-container">
        <SvgLoader icon="medical-notes-4" />

        <div class="ml-4">
          <div class="text-h5 text-secondary">
            {{ $t('patient_record.allergies') }}
          </div>
          <div class="d-flex align-center mt-n1">
            <v-chip
              v-for="(allergy, index) in patientRecord.patient_allergies"
              :key="index"
              size="x-small"
              color="warning"
              close-icon="mdi-close"
              class="mr-1"
            >
              {{ allergy.allergy && allergy.allergy.name }}
              <v-icon
                icon="mdi-close"
                @click="openAllergyDeleteDialog(allergy)"
              ></v-icon>
            </v-chip>
            <btn
              icon="$add"
              icon-only
              :primary="false"
              size="x-small"
              variant="text"
              color="secondary"
              @click="addAllergy"
            />
          </div>
        </div>
      </div>
      <v-divider vertical class="mx-6" />
      <div class="d-flex align-center flags-container">
        <SvgLoader icon="medical-personnel-info" />

        <div class="ml-4">
          <div class="text-h5 text-secondary">
            {{ $t('patient_record.alerts') }}
          </div>
          <div class="d-flex align-center mt-n1">
            <v-chip
              v-for="(flag, index) in patientRecord.patient_flags"
              :key="index"
              size="x-small"
              color="warning"
              class="mr-1"
            >
              {{ flag.flag && flag.flag.name }}
              <v-icon
                icon="mdi-close"
                @click="openAlertDeleteDialog(flag)"
              ></v-icon>
            </v-chip>
            <btn
              icon="$add"
              icon-only
              :primary="false"
              size="x-small"
              variant="text"
              color="secondary"
              @click="addAlert"
            />
          </div>
        </div>
      </div>
      <div v-if="showToggle" class="ml-auto">
        <div class="d-flex align-center">
          <!-- <div class="bordered-min action-icon centered cursor-pointer">
            <v-icon icon="$email" />
          </div>
          <div class="bordered-min action-icon centered cursor-pointer ml-3">
            <v-icon icon="$phone" />
          </div> -->
        </div>
        <div
          @click="$emit('toggle')"
          class="mt-1 bordered-min action-icon centered cursor-pointer"
        >
          <v-icon icon="mdi-dock-right" />
        </div>
      </div>
    </v-card>
    <AllergyDialog
      v-model="showAllergyDialog"
      :allergy="currentAllergy"
      :is-create-action="isCreateAction"
      :added-allergies="patientRecord.patient_allergies"
      @refresh="getMedicalRecord(false)"
    />
    <AlertDialog
      v-model="showAlertDialog"
      :alert="currentAlert"
      :is-create-action="isCreateAction"
      :added-alerts="patientRecord.patient_flags"
      @refresh="getMedicalRecord(false)"
    />
    <BaseConfirmationDialog
      v-model="showDeleteDialog"
      :message="$t('common.are_you_sure_you_want_to_delete_this')"
      @submit="deleteAlertAllergy"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, WritableComputedRef, onMounted } from 'vue';
import moment from 'moment-timezone';
import EditDelete from '@/components/patient/EditDelete.vue';
import SvgLoader from '@/components/common/SvgLoader.vue';
import {
  useCommonStore,
  usePatientStore,
  usePatientRecordStore,
} from '@/store';
import AllergyDialog from '@/components/dialogs/AllergyDialog.vue';
import AlertDialog from '@/components/dialogs/AlertDialog.vue';
import BaseConfirmationDialog from '@/components/common/BaseConfirmationDialog.vue';
import {
  IPatientAllergy,
  IPatientAlert,
  IPatientRecord,
  ToastType,
} from '@/types';

import { useI18n } from 'vue-i18n';

const commonStore = useCommonStore();
const patientStore = usePatientStore();
const patientRecordStore = usePatientRecordStore();

const props = defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  showToggle: {
    type: Boolean,
    default: true,
  },
});

const { t } = useI18n();

const loading = ref<boolean>(false);
const deleting = ref<any>(false);
const showAllergyDialog = ref<boolean>(false);
const showAlertDialog = ref<boolean>(false);
const showAlertDeleteDialog = ref<boolean>(false);
const showAllergyDeleteDialog = ref<boolean>(false);
const showDeleteDialog = ref<boolean>(false);
const isCreateAction = ref<boolean>(true);
const panels = ref<{
  allergies?: number;
  alerts?: number;
  vitals?: number;
}>({});
const currentAllergy = ref<IPatientAllergy>(<IPatientAllergy>{});
const currentAlert = ref<IPatientAlert>(<IPatientAlert>{});

const currentPatientId = computed(() => {
  return patientStore.currentPatientId;
});

const patientRecord: WritableComputedRef<IPatientRecord> = computed(() => {
  return patientRecordStore.patientRecord || <IPatientRecord>{};
});

const patientAge: WritableComputedRef<number> = computed(() => {
  const today = moment(new Date());
  const dob = moment(patientRecord.value.date_of_birth);
  return today.diff(dob, 'years');
});

onMounted(() => {
  getMedicalRecord();
});

watch(currentPatientId, async () => {
  getMedicalRecord();
});

const getMedicalRecord = (load = true) => {
  if (!currentPatientId.value) return;
  if (load) loading.value = true;
  patientRecordStore
    .getPatientRecord(currentPatientId.value)
    .then(() => {})
    .finally(() => {
      loading.value = false;
    });
};

const deleteAlertAllergy = () => {
  if (showAlertDeleteDialog.value) {
    deleteAlert();
  } else {
    deleteAllergy();
  }
};

watch(
  () => showDeleteDialog.value,
  (val) => {
    if (!val) {
      showAlertDeleteDialog.value = false;
      showAllergyDeleteDialog.value = false;
    }
  },
);

const addAllergy = () => {
  currentAllergy.value = Object.assign({}, <IPatientAllergy>{});
  isCreateAction.value = true;
  showAllergyDialog.value = true;
};

const editAllergy = (allergy: IPatientAllergy) => {
  currentAllergy.value = Object.assign({}, allergy);
  isCreateAction.value = false;
  showAllergyDialog.value = true;
};

const deleteAllergy = async () => {
  deleting.value = currentAllergy.value.id;
  await patientRecordStore.deletePatientAllergy(currentAllergy.value);
  commonStore.showToast(ToastType.Success, t('notifications.allergy_deleted'));
  deleting.value = null;
  getMedicalRecord(false);
  showAllergyDeleteDialog.value = false;
  showDeleteDialog.value = false;
};

const openAllergyDeleteDialog = (allergy: IPatientAllergy) => {
  currentAllergy.value = allergy;
  showAllergyDeleteDialog.value = true;
  showDeleteDialog.value = true;
};

const addAlert = () => {
  currentAlert.value = Object.assign({}, <IPatientAlert>{});
  isCreateAction.value = true;
  showAlertDialog.value = true;
};

const editAlert = (alert: IPatientAlert) => {
  currentAlert.value = Object.assign({}, alert);
  isCreateAction.value = false;
  showAlertDialog.value = true;
};

const deleteAlert = async () => {
  deleting.value = currentAlert.value.id;
  await patientRecordStore.deletePatientAlert(currentAlert.value);
  commonStore.showToast(ToastType.Success, t('notifications.alert_deleted'));
  deleting.value = null;
  getMedicalRecord(false);
  showAlertDeleteDialog.value = false;
  showDeleteDialog.value = false;
};

const openAlertDeleteDialog = (alert: IPatientAlert) => {
  currentAlert.value = alert;
  showAlertDeleteDialog.value = true;
  showDeleteDialog.value = true;
};
</script>

<style scoped lang="scss">
.action-icon {
  width: 40px !important;
  height: 40px;
}

.flags-container {
  @media (min-width: 1470px) {
    margin-bottom: 28px;
  }

  @media (max-width: 1470px) {
    margin-top: 28px;
  }
}

.allergies-container {
  @media (min-width: 839px) {
    margin-bottom: 28px;
  }

  @media (max-width: 839px) {
    margin-top: 28px;
  }
}
</style>
