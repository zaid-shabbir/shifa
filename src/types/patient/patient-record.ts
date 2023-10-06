import { ICity, IEthnicity, ILanguage, IReligion, ICodeName } from '../common';

import { IAlert, IAllergy } from '../metadata';

export interface IPatientAllergy {
  id?: string;
  is_active?: boolean;
  medical_record?: number;
  allergy: IAllergy;
  severity: string;
  onset_date: string | Date;
  reaction_manifestation: string;
  clinical_status: string;
  notes: string;
  patient?: string | null;
  created_by_user?: string;
  created_date?: string;
  deleted_by_user?: string;
  deleted_date?: string;
}

export interface IPatientAlert {
  id?: number;
  name: string;
  flag?: IAlert;
  is_active: boolean;
  code?: string;
  icon?: string;
  notes?: string;
  patient?: string | null

}

export interface IPatientRecord {
  id: string;
  address: string;
  age: number;
  city: ICity;
  date_of_birth: string;
  ethnicity: IEthnicity;
  first_name: string;
  gender: ICodeName;
  image: string | null;
  last_name: string;
  last_visit: string | null;
  health_id: string | null;
  patient_allergies: any[];
  patient_flags: any[];
  patient_immunizations: any[];
  patient_vitalsigns: any[];
  preferred_language: ILanguage;
  registration_method: number;
  religion: IReligion;
  smoking_status: ICodeName;
  drinking_status: ICodeName;
  telephone: string;
  title: string;
}
