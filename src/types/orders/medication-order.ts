import { IPaginationQuery } from '../common';

export interface IMedicationVariation {
  id: number;
  medication: number;
  medication_name: string;
  dosage: string;
  frequency: string;
  route: string;
  is_active: boolean;
  medication_with_dosage: string;
}

export interface IMedicationOrderItem {
  id: number;
  medication_variation: IMedicationVariation;
  status: string;
  notes: string;
}

export interface IMedicationOrder {
  id: number;
  medication_order_items: IMedicationOrderItem[];
  created_date: string;
  is_active: boolean;
  soft_delete: boolean;
  deleted_date: string;
  status: string;
  notes: string;
  created_by_user: string;
  deleted_by_user: string;
  encounter: string;
  practitioner: string;
  patient: string;
  facility: string;
}

export interface IMedicationOrderPayload {
  encounter: string;
  practitioner: string;
  patient: string;
  medication_order_items: {
    medication_variation: number;
  }[];
  notes: string;
}

export interface IMedicationOrderQuery extends IPaginationQuery {
  encounter_id?: string;
  medication_order_id?: string;
  medication?: string;
  from_date?: string;
  to_date?: string;
  status?: string;
  patient_id?: string;
  practitioner_id?: string;
}
