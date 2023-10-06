import { ICity, ICodeName, IEthnicity, ILanguage, IReligion } from '../common';

export interface IPatient {
  id: string;
  address: string;
  city: ICity;
  date_of_birth: string;
  ethnicity: IEthnicity;
  first_name: string;
  last_name: string;
  patient_name?: string;
  gender: string;
  health_id: string | null;
  phone_1: string;
  preferred_language: ILanguage;
  registration_method: number;
  religion: IReligion;
  smoking_status: ICodeName;
  telephone: string;
  title: string;
  email: string;
  picture?: string;
}
