interface IUpdatePatientConditionPayload {
  condition: number;
  is_present: boolean;
}

export interface IBulkUpdatePatientConditionPayload {
  conditions: IUpdatePatientConditionPayload[];
}
