import { ICodeName, IMedicationOrder } from '@/types';

export interface IEncounterFollowup {
  id?: string;
  encounter: string;
  followup_note: string;
  followup_date: string;
}

export interface IEncounterImagingOrder {
  created_by_user?: string;
  created_date?: string;
  deleted_by_user?: string;
  deleted_date?: string;
  encounter: string;
  facility: string;
  id?: number;
  is_active?: boolean;
  notes?: string;
  patient?: string;
  priority?: string;
  referring_practitioner?: string;
  scans: IScan[];
  soft_delete?: boolean;
  status?: string;
}

export interface IScan {
  id: number;
  scan_type: IScanType;
  notes: null | string;
  scan_date: null | string;
  status: string;
}

export interface IScanType {
  id: number;
  modality: string;
  scan_category: string;
  body_part: string;
  name: string;
  CPT_code: string;
  ICD_10_code: string;
  is_active: boolean;
}

export interface IScanPayload {
  encounter: string;
  patient: string;
  facility: string;
  practitioner: string;
  scans: IScanTypePayload[];
}

export interface IScanTypePayload {
  scan_type: number;
  notes: string | null;
}

export interface IEncounterLabOrder {
  created_by_user?: string;
  created_date?: string;
  deleted_by_user?: string;
  deleted_date?: string;
  encounter: string;
  facility: string;
  id?: number;
  is_active?: boolean;
  notes: string;
  patient?: string;
  priority?: string;
  referring_practitioner?: string;
  lab_order_items: ILabOrderTest[];
  lab_test_profile: number;
  soft_delete?: boolean;
  status?: string;
}

export interface ILabOrderTest {
  id: number;
  lab_order: number;
  lab_test: ILabTest;
  notes: null | string;
  test_date: null | string;
  test_result: null | string;
  status: string;
}

export interface ILabTest {
  description: string;
  id: number;
  is_active: boolean;
  is_fasting_required: boolean;
  name: string;
  name_arabic: string;
  name_kurdish: string;
  name_short: string;
  patient_instructions: string;
  range: string;
  specimen_type: string;
  unit: string;
}

export interface ITestProfileItem {
  id: number;
  lab_test: ILabTest;
  order_by: number;
  profile_id: number;
  profile_name: string;
  profile_name_short: string;
}

export interface ILabOrderPayload {
  encounter: string;
  patient: string;
  facility: string;
  notes: null | string;
  practitioner: string;
  lab_test_profile: number;
  lab_order_items: ILabOrderTestPayload[];
}

export interface ILabOrderTestPayload {
  lab_test: number;
}

export interface IEncounterItem {
  encounter: string;
  id?: number;
  created_date?: string;
  is_active?: boolean;
  soft_delete?: boolean;
  deleted_date?: string;
  created_by_user?: string;
  deleted_by_user?: string;
  advice?: string;
  complaint?: string;
  diagnosis?: string;
  lab_order?: string;
  medication?: string;
  observation?: string;
  priority?: string;
}

export interface IEncounter {
  id: string;
  encounter_date: string;
  encounter_priority: ICodeName;
  encounter_status: ICodeName;
  encounter_type: ICodeName;
  facility: string;
  follow_up_required: boolean;
  created_by_user?: string;
  created_date?: string;
  deleted_by_user?: string | null;
  deleted_date?: string | null;
  soft_delete?: boolean;
  is_active?: boolean;
  notes: string;
  patient: string;
  practitioner: string;
  advice: IEncounterItem[];
  complaints: IEncounterItem[];
  diagnosis: IEncounterItem[];
  followup: IEncounterFollowup[];
  imaging_orders: IEncounterImagingOrder[];
  lab_orders: IEncounterLabOrder[];
  medication_orders: IMedicationOrder[];
  observations: IEncounterItem[];
}
