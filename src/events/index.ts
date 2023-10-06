import { AppointmentEvents, IAppointment } from '@/types';
import mitt from 'mitt';

type Events = {
  [AppointmentEvents.ReloadAppointments]: void;
  [AppointmentEvents.ShowAppointmentUpdateDialog]: IAppointment;
}

export const events = mitt<Events>();
