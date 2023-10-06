import { ContactMethod } from '../common';

export interface IRegisterPatientAppointmentPayload {
  patient: string;
  facility: string;
  practitioner: string;
  appointment_date: string;
  duration_mins: number;
  contact_method: ContactMethod;
  appointment_purpose: string;
  notes: string;
}
