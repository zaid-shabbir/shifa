import { ICodeName, IPaginationQuery } from '../common';

export interface ILabOrder {
  id: number;
  patient: string;
  patient_name: string;
  referring_practitioner: string;
  practitioner_name: string;
  encounter: string;
  status: ICodeName;
  priority: ICodeName;
  test_count: number;
  notes: string;
  created_date: string;
  test_profile_id: string;
  test_profile_short_name: string;
}

export interface ILabOrderQuery extends IPaginationQuery {
  encounter_id?: string;
  lab_order_id?: string;
  test_profile_id?: string;
  order_date?: string;
  from_date?: string;
  to_date?: string;
  order_status?: string;
  status?: string;
  patient_id?: string;
  practitioner_id?: string;
}
