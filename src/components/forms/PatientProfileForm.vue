<template>
  <card-container
    :title="currentPatient ? null : $t('register_patient.register_patient')"
    :icon="currentPatient ? null : '$patient-injury'"
    :max-width="currentPatient ? null : 1077"
    class="justify-center"
  >
    <v-form ref="formRef" v-model="isValidForm" @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col cols="12" v-if="!currentPatient">
            <v-card-title class="px-0">{{
              $t('register_patient.personal_information')
            }}</v-card-title>
          </v-col>

          <v-col cols="6" class="py-2">
            <text-field
              v-model="formData.firstName"
              :rules="[required]"
              :label="$t('register_patient.first_name')"
              attr="first_name"
            />
          </v-col>
          <v-col cols="6" class="py-2">
            <text-field
              v-model="formData.lastName"
              :rules="[required]"
              :label="$t('register_patient.last_name')"
              attr="last_name"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <select-field
              v-model="formData.title"
              :items="titlesMock"
              :rules="[required]"
              :label="$t('register_patient.title')"
              attr="title"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <select-field
              v-model="formData.gender"
              :items="gendersMock"
              :rules="[required]"
              :label="$t('register_patient.gender')"
              attr="gender"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <text-field
              v-model="formData.email"
              :rules="[validOptionalEmail]"
              :label="$t('register_patient.email')"
              attr="email"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <date-picker
              v-model="formData.dateOfBirth"
              :rules="[required]"
              :placeholder="$t('register_patient.date_of_birth')"
              attr="date_of_birth"
            />
          </v-col>
          <v-col class="py-2">
            <select-field
              v-model="formData.ethnicity"
              :items="ethnicitiesMock"
              :rules="[required]"
              :label="$t('register_patient.ethnicity')"
              attr="ethnicity"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <text-field
              v-model="formData.phoneNumber"
              :rules="[required]"
              :label="$t('register_patient.phone_number')"
              attr="phone_1"
            />
          </v-col>
          <v-col cols="6" class="py-2">
            <text-field
              v-model="formData.telephone"
              :rules="[required]"
              :label="$t('register_patient.telephone')"
              attr="telephone"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <text-field
              v-model="formData.address"
              :rules="[required]"
              :label="$t('register_patient.address')"
              attr="address"
            />
          </v-col>
          <v-col cols="6" class="py-2">
            <select-field
              v-model="formData.city"
              :items="citiesMock"
              :rules="[required]"
              :label="$t('register_patient.city')"
              attr="city"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <select-field
              v-model="formData.religion"
              :items="religionsMock"
              :rules="[required]"
              :label="$t('register_patient.religion')"
              attr="religion"
            />
          </v-col>
          <v-col cols="6" class="py-2">
            <select-field
              v-model="formData.language"
              :items="languages"
              :rules="[required]"
              :label="$t('register_patient.language')"
              attr="preferred_language"
            />
          </v-col>

          <v-col cols="6" class="py-2">
            <select-field
              v-model="formData.registrationMethod"
              :items="registrationMethodsMock"
              :rules="[required]"
              :label="$t('register_patient.registration_method')"
              attr="registration_method"
            />
          </v-col>
          <v-col cols="6" class="py-2">
            <select-field
              v-model="formData.smokingStatus"
              :items="smokingStatusesMock"
              :rules="[required]"
              :label="$t('register_patient.smoking_status')"
              attr="smoking_status"
            />
          </v-col>
        </v-row>

        <template v-if="!currentPatient">
          <v-divider class="mt-7 mb-4" />

          <v-row>
            <v-col cols="12">
              <v-card-title class="px-0">{{
                $t('register_patient.consent_agreement')
              }}</v-card-title>
            </v-col>

            <v-col cols="12">
              <v-card-text class="pa-0 text-disabled">{{
                $t('register_patient.consent_agreement')
              }}</v-card-text>
            </v-col>
          </v-row>

          <v-row class="mt-0">
            <v-col class="ps-0 py-2">
              <checkbox
                :label="$t('register_patient.accept_consent_agreement')"
                v-model="isAcceptAgreement"
              />
            </v-col>
          </v-row>
        </template>

        <v-divider class="my-4" />
        <v-row>
          <v-col class="text-right">
            <btn
              primary
              type="submit"
              :loading="commonStore.isLoading"
              :disabled="!currentPatient && !isAcceptAgreement"
            >
              {{
                currentPatient
                  ? $t('common.save')
                  : $t('register_patient.register_patient')
              }}
            </btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </card-container>
</template>

<script lang="ts" setup>
import { PropType, reactive, ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

import { required, validOptionalEmail } from '@/utils/validations';
import {
  languages,
  titlesMock,
  gendersMock,
  ethnicitiesMock,
  citiesMock,
  religionsMock,
  registrationMethodsMock,
  smokingStatusesMock,
} from '@/constants';
import {
  usePatientRegisterStore,
  useCommonStore,
  useFacilityStore,
  usePatientStore,
} from '@/store';
import { IPatient, IUpdatePatientPayload, ToastType } from '@/types';

const commonStore = useCommonStore();
const patientRegisterStore = usePatientRegisterStore();
const patientStore = usePatientStore();
const facilityStore = useFacilityStore();

const router = useRouter();

const { t } = useI18n();

const props = defineProps({
  currentPatient: {
    type: Object as PropType<IPatient | null>,
    default: null,
  },
});

const isValidForm = ref(false);
const formRef = ref(null);

const formData = reactive<{
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  gender?: string;
  dateOfBirth?: Date;
  ethnicity?: string;
  phoneNumber?: string;
  telephone?: string;
  address?: string;
  city?: number;
  religion?: string;
  language?: string;
  registrationMethod?: number;
  smokingStatus?: string;
}>({
  firstName: '',
  lastName: '',
  title: '',
  email: '',
  gender: '',
  dateOfBirth: undefined,
  ethnicity: '',
  phoneNumber: '',
  telephone: '',
  address: '',
  city: undefined,
  religion: '',
  language: 'CKB',
  registrationMethod: 3,
  smokingStatus: '',
});

const isAcceptAgreement = ref(false);

onMounted(() => {
  updatePatientProfile();
});

watch(
  () => props.currentPatient,
  () => {
    updatePatientProfile();
  },
);

const updatePatientProfile = () => {
  if (props.currentPatient) {
    // update patient
    formData.firstName = props.currentPatient.first_name;
    formData.lastName = props.currentPatient.last_name;
    formData.title = props.currentPatient.title;
    formData.email = props.currentPatient.email;
    formData.gender = props.currentPatient.gender;
    formData.dateOfBirth = moment
      .utc(props.currentPatient.date_of_birth)
      .toDate();
    formData.ethnicity = props.currentPatient.ethnicity.code;
    formData.phoneNumber = props.currentPatient.phone_1;
    formData.telephone = props.currentPatient.telephone;
    formData.address = props.currentPatient.address;
    formData.city = props.currentPatient.city.id;
    formData.religion = props.currentPatient.religion.code;
    formData.language = props.currentPatient.preferred_language.iso_code;
    formData.registrationMethod = props.currentPatient.registration_method;
    formData.smokingStatus = props.currentPatient.smoking_status.code;
  }
};

const generateMockEmail = () => {
  let removedSpaceConcatedNames = `${formData.firstName?.replaceAll(' ', '')}.${formData.lastName?.replaceAll(' ', '')}`;

  return `${removedSpaceConcatedNames.toLocaleLowerCase()}@example.com`;
};

const submit = async () => {
  await commonStore.clearErrorOnSubmit();

  if (!isValidForm.value) {
    return;
  }

  const payload: IUpdatePatientPayload = {
    title: formData.title!,
    email: formData.email || generateMockEmail(),
    first_name: formData.firstName!,
    last_name: formData.lastName!,
    date_of_birth: moment.utc(formData.dateOfBirth).format('YYYY-MM-DD'),
    phone_1: formData.phoneNumber!,
    gender: formData.gender!,
    registration_method: formData.registrationMethod!,
    registered_facility: facilityStore.currentFacilityId!,
    smoking_status: formData.smokingStatus!,
    address: formData.address!,
    telephone: formData.telephone!,
    ethnicity: formData.ethnicity!,
    religion: formData.religion!,
    preferred_language: formData.language!,
    city: formData.city!,
  };

  if (props.currentPatient) {
    await patientStore.updateCurrentPatient(payload);
    await patientStore.getCurrentPatient(true);

    commonStore.showToast(
      ToastType.Success,
      t('patient.update_patient_success'),
    );
  } else {
    const patient = await patientRegisterStore.registerPatient(payload);
    await patientStore.getCurrentPatient(true);

    commonStore.showToast(
      ToastType.Success,
      t('register_patient.register_patient_success'),
    );

    router.push(`/patients/${patient.id}/condition`);
  }
};
</script>
