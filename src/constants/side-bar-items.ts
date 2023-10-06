import { ISideBarItem } from '@/types';
import { PageId } from './page-id';

export const sideBarItems: ISideBarItem[] = [
  {
    pageId: PageId.Patients,
    name: 'Patients',
    icon: '$patient-injury',
    children: [
      {
        pageId: PageId.PatientList,
        name: 'Patient List',
        path: '/patients/list',
      },
      {
        pageId: PageId.PatientProfile,
        name: 'Patient Profile',
        path: '/patients/profile',
      },
      {
        pageId: PageId.PatientCondition,
        name: 'Patient Condition',
        path: '/patients/:patientId/condition',
      },
      {
        pageId: PageId.PatientMeasures,
        name: 'Patient Measures',
        path: '/patients/:patientId/measures',
      },
    ],
  },
  {
    pageId: PageId.MedicalRecords,
    name: 'Medical Records',
    icon: '$medical-records',
    children: [
      {
        pageId: PageId.EncounterNotes,
        name: 'Encounter Notes',
        path: '/medical-records/encounter-notes',
      },
      {
        pageId: PageId.TestResults,
        name: 'Test Results',
        path: '/medical-records/test-results',
      },
      {
        pageId: PageId.Medications,
        name: 'Medications',
        path: '/medical-records/medications',
      },
      {
        pageId: PageId.Procedures,
        name: 'Procedures',
        path: '/medical-records/procedures',
      },
    ],
  },
  {
    pageId: PageId.Orders,
    name: 'Orders',
    icon: '$orders',
    children: [
      {
        pageId: PageId.MedicationOrders,
        name: 'Medication Orders',
        path: '/orders/medication-orders',
      },
      {
        pageId: PageId.LabOrders,
        name: 'Lab Orders',
        path: '/orders/lab-orders',
      },
      {
        pageId: PageId.ImagingOrders,
        name: 'Imaging Orders',
        path: '/orders/imaging-orders',
      },
    ],
  },
  {
    pageId: PageId.Referrals,
    name: 'Referrals',
    icon: '$referrals',
    children: [
      {
        pageId: PageId.ReferralRequests,
        name: 'Referral Requests',
        path: '/referrals/referral-requests',
      },
    ],
  },
  {
    pageId: PageId.Billing,
    name: 'Billing',
    icon: '$medical-notes',
    children: [
      {
        pageId: PageId.Invoices,
        name: 'Invoices',
        path: '/billing/invoices',
      },
      {
        pageId: PageId.Payments,
        name: 'Payments',
        path: '/billing/payments',
      },
    ],
  },
  {
    pageId: PageId.Reports,
    name: 'Reports',
    icon: '$reports',
    children: [
      {
        pageId: PageId.Analytics,
        name: 'Analytics',
        path: '/reports/analytics',
      },
    ],
  },
];
