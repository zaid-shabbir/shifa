export interface ICondition {
  id: number;
  name: string;
  code: string;
  category: string;
  description?: string;
  order_by: number;
  is_active: boolean;
}

export interface IAllergy {
  id: number;
  name: string;
  code: string;
  category: string;
  description?: string;
  is_active: boolean;
}

export interface IAlert {
  id?: number;
  name: string;
  code?: string;
  icon?: string;
  is_active?: boolean;
}

export interface IMeasure {
  id?: number;
  name: string;
  measure_type?: string;
  unit?: string;
  description?: string;
  is_active?: boolean;
  value?: string | number;
}

export interface IMetaDataAdviceQuery {
  facility?: string;
  name?: string;
  practitioner?: string;
}

export interface IMetaDataICDCodeQuery {
  code?: string;
  name: string;
  practitioner?: string;
  type?: string;
}

export interface IMetaDataMedicationOrderQuery {
  medication?: string;
}

export interface IMetaDataICDCode {
  icd_code: string;
  category_code: string;
  diagnosis_code: string;
  short_description: string;
  long_description: string;
  category_title: string;
  is_active: boolean;
}
