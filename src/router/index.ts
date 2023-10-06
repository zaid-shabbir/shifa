// composables
import { createRouter, createWebHistory } from 'vue-router';

// layouts
const MainLayout = import('@/layouts/Main.vue');
const PatientLayout = import('@/layouts/Patient.vue');

// views
const Dashboard = import('@/views/Dashboard.vue');
const PatientList = import('@/views/patients/PatientList.vue');
const PatientProfile = import('@/views/patients/PatientProfile.vue');
const PatientCondition = import('@/views/patients/PatientCondition.vue');
const PatientMeasures = import('@/views/patients/PatientMeasures.vue');

const EncounterNotes = import('@/views/medical-records/EncounterNotes.vue');
const TestResults = import('@/views/medical-records/TestResults.vue');
const Medications = import('@/views/medical-records/Medications.vue');
const Procedures = import('@/views/medical-records/Procedures.vue');

const MedicationOrders = import('@/views/orders/MedicationOrders.vue');
const LabOrders = import('@/views/orders/LabOrders.vue');
const ImagingOrders = import('@/views/orders/ImagingOrders.vue');

const ReferralRequests = import('@/views/referrals/ReferralRequests.vue');

const Analytics = import('@/views/reports/Analytics.vue');

const Invoices = import('@/views/billing/Invoices.vue');
const Payments = import('@/views/billing/Payments.vue');

const Login = import('@/views/Login.vue');
const RegisterPatient = import('@/views/RegisterPatient.vue');

// services
import { LocalStorageService } from '@/services';

const routes = [
  // Dashboard
  {
    path: '/',
    component: () => MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => Dashboard,
      },
      // Patients
      {
        path: 'patients',
        redirect: '/patients/list',
        children: [
          {
            path: 'list',
            name: 'Patient List',
            component: () => PatientList,
          },
          {
            path: ':patientId/condition',
            name: 'Patient Condition',
            component: () => PatientCondition,
          },
          {
            path: ':patientId/measures',
            name: 'Patient Measures',
            component: () => PatientMeasures,
          },
        ],
      },
      // Medical Records
      {
        path: 'medical-records',
        redirect: '/medical-records/encounter-notes',
        children: [
          {
            path: 'test-results',
            name: 'Test Results',
            component: () => TestResults,
          },
          {
            path: 'medications',
            name: 'Medications',
            component: () => Medications,
          },
          {
            path: 'procedures',
            name: 'Procedures',
            component: () => Procedures,
          },
        ],
      },
      // Orders
      {
        path: 'orders',
        redirect: '/orders/medication-orders',
        children: [
          {
            path: 'medication-orders',
            name: 'Medication Orders',
            component: () => MedicationOrders,
          },
          {
            path: 'lab-orders',
            name: 'Lab Orders',
            component: () => LabOrders,
          },
          {
            path: 'imaging-orders',
            name: 'Imaging Orders',
            component: () => ImagingOrders,
          },
        ],
      },
      // Refereals
      {
        path: 'referrals',
        redirect: '/referrals/referral-requests',
        children: [
          {
            path: 'referral-requests',
            name: 'Referral Requests',
            component: () => ReferralRequests,
          },
        ],
      },
      // Reports
      {
        path: 'reports',
        redirect: '/reports/analytics',
        children: [
          {
            path: 'analytics',
            name: 'Analytics',
            component: () => Analytics,
          },
        ],
      },
      // Billing
      {
        path: 'billing',
        redirect: '/billing/invoices',
        children: [
          {
            path: 'invoices',
            name: 'Invoices',
            component: () => Invoices,
          },
          {
            path: 'payments',
            name: 'Payments',
            component: () => Payments,
          },
        ],
      },
      // Register Patient
      {
        path: '/register',
        redirect: '/register/patient',
        children: [
          {
            path: 'patient',
            name: 'Register Patient',
            component: () => RegisterPatient,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: () => PatientLayout,
    children: [
      {
        path: '/patients/profile',
        name: 'Patient Profile',
        component: () => PatientProfile,
      },
      {
        path: '/medical-records/encounter-notes',
        name: 'Encounter Notes',
        component: () => EncounterNotes,
      },
    ],
  },
  // Auth
  {
    path: '/login',
    name: 'Login',
    component: () => Login,
  },
  // Not found
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogin = to.path.startsWith('/login');
  if (isLogin) {
    next();
    return;
  }

  const token = LocalStorageService.getInstance().getToken();
  const currentFacilityId =
    LocalStorageService.getInstance().getCurrentFacilityId();

  if (!token || !currentFacilityId) {
    next('/login');

    return;
  }

  next();
});

export default router;
