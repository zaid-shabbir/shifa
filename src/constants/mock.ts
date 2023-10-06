import { ISelect } from '@/types';

// TODO: we will replace these with metadata API later so don't need to put them in i18n
export const hospitalsMock = ['Hospital 1', 'Hospital 2', 'Hospital 3'];

export const titlesMock: ISelect<string>[] = [
  {
    title: 'Doctor',
    value: 'Dr',
  },
  {
    title: 'Professor',
    value: 'Prof',
  },
  {
    title: 'Mr',
    value: 'Mr',
  },
  {
    title: 'Mrs',
    value: 'Mrs',
  },
  {
    title: 'Miss',
    value: 'Miss',
  },
];

export const gendersMock: ISelect<string>[] = [
  {
    title: 'Male',
    value: 'M',
  },
  {
    title: 'Female',
    value: 'F',
  },
];

export const ethnicitiesMock: ISelect<string>[] = [
  {
    title: 'Arab',
    value: 'AR',
  },
  {
    title: 'Kurd',
    value: 'KU',
  },
  {
    title: 'Turk',
    value: 'TU',
  },
  {
    title: 'Assyrians',
    value: 'AS',
  },
  {
    title: 'Chaldeans',
    value: 'CH',
  },
  {
    title: 'African',
    value: 'AF',
  },
  {
    title: 'European',
    value: 'EU',
  },
  {
    title: 'Asian',
    value: 'AS',
  },
  {
    title: 'American',
    value: 'NA',
  },
  {
    title: 'Other',
    value: 'OT',
  },
];

export const citiesMock: ISelect<number>[] = [
  {
    title: 'Erbil',
    value: 1,
  },
  {
    title: 'Duhok',
    value: 2,
  },
  {
    title: 'Sulaimaniya',
    value: 3,
  },
];

export const religionsMock: ISelect<string>[] = [
  {
    title: 'Christianity',
    value: 'CH',
  },
  {
    title: 'Islam',
    value: 'IS',
  },
  {
    title: 'Yazidism',
    value: 'YA',
  },
  {
    title: 'Judaism',
    value: 'JU',
  },
  {
    title: 'Mandaeism',
    value: 'MA',
  },
  {
    title: 'Zoroastrianism',
    value: 'ZO',
  },
  {
    title: 'Buddhism',
    value: 'BU',
  },
  {
    title: 'Hinduism',
    value: 'HI',
  },
  {
    title: 'Other',
    value: 'OT',
  },
];

export const registrationMethodsMock: ISelect<number>[] = [
  {
    title: 'Mobile APP',
    value: 1,
  },
  {
    title: 'Website',
    value: 2,
  },
  {
    title: 'Offline - Practice',
    value: 3,
  },
];

export const smokingStatusesMock: ISelect<string>[] = [
  {
    title: 'Non Smoker',
    value: 'non_smoker',
  },
  {
    title: 'Light Smoker',
    value: 'light_smoker',
  },
  {
    title: 'Moderate Smoker',
    value: 'moderate_smoker',
  },
  {
    title: 'Heavy Smoker',
    value: 'heavy_smoker',
  },
  {
    title: 'Occasional Smoker',
    value: 'occasional_smoker',
  },
  {
    title: 'Former Smoker',
    value: 'former_smoker',
  },
];

export const contactMethodsMock: ISelect<number>[] = [
  {
    title: 'Phone',
    value: 1,
  },
  {
    title: 'Online - Website',
    value: 2,
  },
  {
    title: 'Online - Mobile App',
    value: 3,
  },
  {
    title: 'Offline - Visit to Facility',
    value: 4,
  },
];

export const appointmentStatusesMock: ISelect<number>[] = [
  {
    title: 'New - Planned',
    value: 1,
  },
  {
    title: 'Confirmed - Checked In',
    value: 2,
  },
  {
    title: 'Cancelled',
    value: 3,
  },
  {
    title: 'NoShow',
    value: 4,
  },
];

export const imagingOrderStatusesMock: ISelect<string>[] = [
  {
    title: 'New',
    value: 'new',
  },
  {
    title: 'Scheduled',
    value: 'scheduled',
  },
  {
    title: 'In Progress',
    value: 'in-Progress',
  },
  {
    title: 'Completed',
    value: 'completed',
  },
  {
    title: 'Cancelled',
    value: 'cancelled',
  },
];

export const invoiceStatusesMock: ISelect<string>[] = [
  {
    title: 'Pending',
    value: 'pending',
  },
  {
    title: 'Paid',
    value: 'paid',
  },
  {
    title: 'Cancelled',
    value: 'cancelled',
  },
  {
    title: 'Refunded',
    value: 'refunded',
  },
  {
    title: 'Partial',
    value: 'partial',
  },
  {
    title: 'Overpaid',
    value: 'overpaid',
  },
];

export const paymentMethodsMock: ISelect<string>[] = [
  {
    title: 'Cash',
    value: 'cash',
  },
  {
    title: 'Card',
    value: 'card',
  },
];
