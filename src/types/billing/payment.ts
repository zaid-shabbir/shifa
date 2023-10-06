import { IPaginationQuery } from '../common';

export interface IPayment {
  amount_paid: string;
  created_by_user: string;
  created_date: string;
  currency: string;
  deleted_by_user: string | null;
  deleted_date: string | null;
  id: number;
  invoice: string;
  is_active: boolean;
  notes: string | null;
  payment_date: string;
  payment_method: string;
  soft_delete: boolean;
  patient: string;
  patient_name: string;
  practitioner: string;
  practitioner_name: string;
}

export interface IPaymentQuery extends IPaginationQuery {
  encounter_id?: string;
  from_date?: string;
  to_date?: string;
  payment_method?: string;
  payment_id?: string;
  patient_id?: string;
  practitioner_id?: string;
}
