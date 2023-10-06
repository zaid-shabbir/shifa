import { IconAliases } from 'vuetify';
import { aliases as defaultAliases } from 'vuetify/iconsets/mdi';

import dashboard from '@/assets/icons/dashboard.svg?component';
import patientInjury from '@/assets/icons/patient-injury.svg?component';
import patientSearch from '@/assets/icons/patient-search.svg?component';
import medicalRecords from '@/assets/icons/medical-records.svg?component';
import medicalNotes from '@/assets/icons/medical-notes-3.svg?component';
import orders from '@/assets/icons/orders.svg?component';
import referrals from '@/assets/icons/referrals.svg?component';
import reports from '@/assets/icons/reports.svg?component';

import calendar from '@/assets/icons/calendar.svg?component';
import phone from '@/assets/icons/phone.svg?component';
import email from '@/assets/icons/email.svg?component';
import password from '@/assets/icons/password.svg?component';

import add from '@/assets/icons/add.svg?component';
import edit from '@/assets/icons/edit.svg?component';
import deleteIcon from '@/assets/icons/delete.svg?component';

import info from '@/assets/icons/info.svg?component';
import chat from '@/assets/icons/chat.svg?component';
import smoking from '@/assets/icons/smoking.svg?component';
import wine from '@/assets/icons/glass-wine.svg?component';
import leftArrow from '@/assets/icons/left-arrow.svg?component';
import rightArrow from '@/assets/icons/right-arrow.svg?component';

export const aliases: IconAliases = {
  ...defaultAliases,
  dashboard,
  'patient-injury': patientInjury,
  'patient-search': patientSearch,
  'medical-records': medicalRecords,
  'medical-notes': medicalNotes,
  orders,
  referrals,
  reports,

  calendar,
  phone,
  email,
  password,

  add,
  edit,
  delete: deleteIcon,

  info,
  chat,
  smoking,
  wine,
  'left-arrow': leftArrow,
  'right-arrow': rightArrow,
};
