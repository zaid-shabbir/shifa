<template>
  <v-container fluid class="detail-view">
    <v-row no-gutters>
      <v-col>
        <div class="detail-view-th">{{ $t('patient_record.health_id') }}:</div>
        <div class="detail-view-td last-child">
          <div class="mb-2">
            {{ medicalRecord?.health_id }}
          </div>
          <div class="mb-2 text-disabled">
            {{ $t('patient_record.last_visit') }}:
            {{ timeSince(medicalRecord?.last_visit) }}
          </div>
          <div class="d-flex">
            <div>
              <v-icon icon="$info" class="mr-3" />
              <tooltip>Info</tooltip>
            </div>
            <div>
              <v-icon icon="$chat" class="mr-3" />
              <tooltip>Chat</tooltip>
            </div>
            <div>
              <v-icon icon="$smoking" class="mr-3" />
              <tooltip>
                {{ medicalRecord?.smoking_status?.name }}
              </tooltip>
            </div>
            <div>
              <v-icon icon="$wine" class="mr-3" />
              <tooltip>
                {{ medicalRecord?.drinking_status?.name }}
              </tooltip>
            </div>
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="detail-view-th">{{ $t('patient_record.language') }}:</div>
        <div class="detail-view-td last-child">
          {{ medicalRecord?.preferred_language?.name }}
        </div>
      </v-col>

      <v-col>
        <div class="detail-view-th">{{ $t('patient_record.allergies') }}:</div>
        <div
          v-for="(name, index) of alergyNames"
          :key="index"
          class="detail-view-td last-child"
        >
          {{ name }}
        </div>
      </v-col>

      <v-col>
        <div class="detail-view-th">{{ $t('patient_record.alerts') }}:</div>
        <div
          v-for="(name, index) of flagNames"
          :key="index"
          class="detail-view-td last-child"
        >
          {{ name }}
        </div>
      </v-col>

      <v-col>
        <div class="detail-view-th">{{ $t('patient_record.vitals') }}:</div>
        <div
          v-for="(name, index) of vitalSigns"
          :key="index"
          class="detail-view-td last-child"
        >
          {{ name }}
        </div>
      </v-col>

      <v-col>
        <div class="detail-view-th">
          {{ $t('patient_record.immunizations') }}:
        </div>
        <div
          v-for="(name, index) of immunizationNames"
          :key="index"
          class="detail-view-td last-child"
        >
          {{ name }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { computed } from 'vue';

import { IPatientRecord } from '@/types';
import { timeSince } from '@/utils';

const props = defineProps({
  medicalRecord: {
    type: Object as PropType<IPatientRecord>,
    default: () => {},
  },
});

const alergyNames = computed(
  () =>
    props.medicalRecord?.patient_allergies?.map(
      (patientAllergy) => patientAllergy.allergy?.name,
    ) || [],
);

const flagNames = computed(
  () =>
    props.medicalRecord?.patient_flags?.map(
      (patientFlag) => patientFlag.flag?.name,
    ) || [],
);

const vitalSigns = computed(
  () =>
    props.medicalRecord?.patient_vitalsigns?.map(
      (patientVitalSign) => patientVitalSign.vital_sign?.name,
    ) || [],
);

const immunizationNames = computed(
  () =>
    props.medicalRecord?.patient_immunizations?.map(
      (patientImmunization) => patientImmunization.immunization?.name,
    ) || [],
);
</script>
