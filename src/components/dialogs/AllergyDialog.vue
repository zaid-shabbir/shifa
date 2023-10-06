<template>
  <form-dialog v-model="isShowDialog" @submit="save">
    <template v-slot:header>
      <div class="text-primary">
        {{
          isCreateAction
            ? $t('patient.add_allergy')
            : $t('patient.edit_allergy')
        }}
      </div>
    </template>
    <v-row>
      <v-col cols="12">
        <select-field
          v-model="formData.allergy"
          :items="allergies"
          :rules="[required]"
          item-title="name"
          item-value="id"
          :label="$t('patient.allergy')"
          attr="allergy"
        />
      </v-col>
      <v-col cols="12">
        <select-field
          v-model="formData.severity"
          :items="reactionSeverities"
          :rules="[required]"
          item-title="title"
          item-value="value"
          :label="$t('patient.severity')"
          attr="severity"
        />
      </v-col>
      <v-col cols="12">
        <select-field
          v-model="formData.clinical_status"
          :items="clinicalStatuses"
          :rules="[required]"
          item-title="title"
          item-value="value"
          :label="$t('patient.clinical_status')"
          attr="clinical_status"
        />
      </v-col>
      <v-col cols="12">
        <date-picker
          v-model="formData.onset_date"
          :rules="[required]"
          attr="onset_date"
          :placeholder="$t('patient.onset_date')"
        />
      </v-col>
      <v-col cols="12">
        <text-area
          v-model="formData.reaction_manifestation"
          :label="$t('patient.reaction_manifestation')"
          attr="reaction_manifestation"
          :rows="3"
          :rules="[required]"
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
import { reactionSeverities, clinicalStatuses } from '@/constants';
import { IAllergy, IPatientAllergy, ToastType } from '@/types';
import { useI18n } from 'vue-i18n';
import moment from 'moment-timezone';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  allergy: {
    type: Object as PropType<IPatientAllergy>,
    default: () => {},
  },
  addedAllergies: {
    type: Array as PropType<IPatientAllergy[]>,
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

const formData = ref<IPatientAllergy>(<IPatientAllergy>{});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue)
      if (props.allergy && props.allergy.id)
        formData.value = {
          ...props.allergy,
          allergy: props.allergy.allergy.id as any,
          onset_date: moment.utc(props.allergy.onset_date).toDate(),
        };
      else
        formData.value = {
          allergy: null as any,
          severity: null as any,
          clinical_status: null as any,
          onset_date: null as any,
          reaction_manifestation: '',
          notes: '',
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

const allergies: WritableComputedRef<IAllergy[] | undefined> = computed(() => {
  let tempAllergies = props.addedAllergies.map(
    (allergy: IPatientAllergy) => allergy.allergy && allergy?.allergy?.id,
  );

  return patientRecordStore.allergies.filter(
    (allergy: IAllergy) =>
      !tempAllergies.includes(allergy.id) ||
      allergy.id === (props.allergy.allergy && props.allergy.allergy.id),
  );
});

onMounted(async () => {
  await patientRecordStore.getAllergies();
});

const save = async () => {
  const onsetDate = formData.value.onset_date
    ? moment.utc(formData.value.onset_date).format('YYYY-MM-DD')
    : undefined;

  if (props.allergy.id) {
    await patientRecordStore.updatePatientAllergy({
      ...formData.value,
      onset_date: onsetDate!,
    });
    commonStore.showToast(
      ToastType.Success,
      t('notifications.allergy_updated'),
    );
  } else {
    formData.value.patient = patientStore.currentPatientId;
    await patientRecordStore.addPatientAllergy({
      ...formData.value,
      onset_date: onsetDate!,
    });
    commonStore.showToast(
      ToastType.Success,
      t('notifications.allergy_created'),
    );
  }

  emit('refresh');
  isShowDialog.value = false;
};
</script>

<style scoped></style>
