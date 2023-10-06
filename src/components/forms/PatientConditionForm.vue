<template>
  <card-container
    :title="$t('patient_condition.patient_condition')"
    icon="$patient-injury"
    max-width="1077"
    class="w-100"
  >
    <v-form v-model="isValidForm" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="{
              category,
              conditions,
            } in conditionMetadataStore.groupedConditions"
            :key="category"
            cols="12"
            class="py-2"
          >
            <expansion-panel
              v-model="panels[category]"
              :title="_.capitalize(category)"
            >
              <template #title-content>
                <div
                  class="d-flex align-center justify-space-between w-full"
                  @click.stop
                >
                  <div>
                    <switch-btn
                      :label="`No ${_.capitalize(category)} Conditions`"
                      v-model="noConditions[category]"
                      @click.stop
                      :indeterminate="false"
                    >
                    </switch-btn>
                  </div>
                </div>
              </template>
              <template #content>
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="{ id, name } in conditions"
                      :key="id"
                    >
                      <switch-btn
                        :label="name"
                        v-model="formData[id]"
                        :rules="[required]"
                        :disabled="noConditions[category]"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </template>
            </expansion-panel>
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row>
          <v-col class="text-right">
            <btn primary type="submit" :loading="commonStore.isLoading">
              {{ $t('common.submit') }}
            </btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </card-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import _ from 'lodash';

import {
  useCommonStore,
  usePatientStore,
  useConditionMetadataStore,
  usePatientConditionStore,
} from '@/store';
import { ToastType, IBulkUpdatePatientConditionPayload } from '@/types';
import { Ref } from 'vue';
import { required } from '@/utils/validations';

const commonStore = useCommonStore();
const patientStore = usePatientStore();
const conditionMetadataStore = useConditionMetadataStore();
const patientConditionStore = usePatientConditionStore();

const { t } = useI18n();

const isValidForm = ref(false);

const formData: Ref<Record<string, boolean>> = ref({});
const panels: Ref<Record<string, number>> = ref({});
const noConditions: Ref<Record<string, boolean>> = ref({});

onMounted(async () => {
  const allConditions = await conditionMetadataStore.getConditionMetadata();

  if (patientStore.currentPatientId) {
    const patientConditions = await patientConditionStore.getPatientConditions(
      patientStore.currentPatientId,
    );
    patientConditions.forEach((patientCondition) => {
      formData.value[patientCondition.condition.id] =
        patientCondition.is_present;
    });

    allConditions.forEach((condition) => {
      panels.value[condition.category] = 0;
      noConditions.value[condition.category] = false;
    });
  }
});

const mapFormData = (): IBulkUpdatePatientConditionPayload => {
  const conditions = conditionMetadataStore.conditions.map((condition) => ({
    condition: condition.id,
    is_present: noConditions.value[condition.category]
      ? false
      : formData.value[condition.id],
  }));

  return {
    conditions,
  };
};

const submit = async () => {
  await commonStore.clearErrorOnSubmit();

  if (!isValidForm.value) {
    return;
  }

  const patientConditions = mapFormData();
  await patientConditionStore.bulkUpdatePatientConditions(
    patientStore.currentPatientId!,
    patientConditions,
  );

  commonStore.showToast(
    ToastType.Success,
    t('patient_condition.update_patient_conditions_success'),
  );
};
</script>
