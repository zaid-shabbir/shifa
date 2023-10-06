import { ICondition } from '../metadata';

export interface IPatientCondition {
  id: number;
  condition: ICondition;
  created_date: Date;
  is_active: boolean;
  soft_delete: boolean;
  is_present: boolean;
  onset_date: Date;
  clinical_status: string;
  notes: string;
  created_by_user: string;
  patient: string;
}
