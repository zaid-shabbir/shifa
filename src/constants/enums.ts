import { ISelect } from '@/types';

export const reactionSeverities: ISelect<string>[] = [
  { title: 'Low', value: 'low' },
  { title: 'Moderate', value: 'moderate' },
  { title: 'Severe', value: 'severe' },
];

export const clinicalStatuses: ISelect<string>[] = [
  { title: 'Active', value: 'active' },
  { title: 'Inactive', value: 'inactive' },
  { title: 'Resolved', value: 'resolved' },
];
