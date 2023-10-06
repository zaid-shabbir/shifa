import { ContactMethod } from '../common';
import { IFacility } from '../facility';
import { IPatient } from '../patient';
import { IPractitioner } from '../practitioner';
import { AppointmentStatus } from './appointment-status';
import { QueueStatus } from './queue-status';

export interface IAppointment {
  id: string;
  created_date: string;
  is_active: boolean;
  soft_delete: boolean;
  deleted_date: string;
  contact_method: ContactMethod;
  appointment_status: AppointmentStatus;
  queue_status: QueueStatus;
  appointment_date: string;
  duration_mins: number;
  appointment_number: number;
  appointment_purpose: string;
  notes: string;
  created_by_user: string;
  deleted_by_user: string;
  patient: IPatient;
  practitioner: IPractitioner;
  facility: IFacility;
}
