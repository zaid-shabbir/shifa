import { ITableHeader } from '@/types';
export interface IPatientMeasure {
  id: number;
  patient: string;
  medical_record?: number;
  measure_type: string;
  measure?: number;
  value?: string | number;
}

export interface IPatientMeasureValue {
  id: number;
  measure_type: string;
  name: string;
  unit: string;
  data: string;
}

export interface IPatientMeasurePivot {
  column_headers: ITableHeader[];
  data: IPatientMeasureValue[];
}

export interface ITodayeMeasureValue {
  patient?: string;
  measure: number;
  value: string;
  is_abnormal: false;
  index?: number;
}
