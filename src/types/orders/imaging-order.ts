import { ICodeName, IPaginationQuery } from '../common';

export interface IImagingOrder {
  id: number;
  patient: string;
  patient_name: string;
  referring_practitioner: string;
  practitioner_name: string;
  encounter: string;
  status: ICodeName;
  priority: ICodeName;
  modality: string;
  scan_count: number;
  notes: string;
  created_date: string;
}

export interface IImagingOrderQuery extends IPaginationQuery {
  encounter_id?: string;
  imaging_order_id?: string;
  modality?: string;
  order_date?: string;
  status?: string;
  patient_id?: string;
  practitioner_id?: string;
  from_date?: string;
  to_date?: string;
}
