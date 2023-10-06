// types
import {
  ILoginPayload,
  IToken,
  IUserInfo,
  IUpdatePatientPayload,
  IPatient,
  ICondition,
  IBulkUpdatePatientConditionPayload,
  IPatientCondition,
  IPaginatedResponse,
  IFacility,
  IPatientRecord,
  IAllergy,
  IPatientAllergy,
  IPatientAlert,
  IAlert,
  IPatientMeasurePivot,
  IMeasure,
  ISearchFacilityQuery,
  ISearchPractitionerQuery,
  IPractitioner,
  IRegisterPatientAppointmentPayload,
  IAppointment,
  AppointmentAction,
  IEncounter,
  IEncounterItem,
  ISearchPatientQuery,
  IEncounterFollowup,
  ISearchFacilityAppointmentsQuery,
  IImagingOrderQuery,
  IImagingOrder,
  ILabOrderQuery,
  ILabOrder,
  IScan,
  IScanPayload,
  ILabOrderPayload,
  IEncounterImagingOrder,
  IEncounterLabOrder,
  IMedicationOrderPayload,
  ILabOrderTest,
  ITodayeMeasureValue,
  IMedicationOrderQuery,
  IMedicationOrder,
  IInvoiceQuery,
  IInvoice,
  IInvoiceItem,
  ITestProfileItem,
  IConfigQuery,
  IConfig,
  IProduct,
  IInvoicePayload,
  IPaymentQuery,
  IPayment,
  IMetaDataICDCodeQuery,
  IMetaDataICDCode,
  IMedicationOrderItem,
} from '@/types';

// services
import { AxiosService } from './axios-service';

export class ApiService {
  private static instance: ApiService;

  constructor(private readonly axiosService: AxiosService) {}

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(AxiosService.getInstance());
    }

    return ApiService.instance;
  }

  async login(payload: ILoginPayload) {
    // Currently the api is not working without the trailing slash at the end of the endpoint
    return this.axiosService.post<IToken>('auth/login/', payload);
  }

  async getUserInfo() {
    return this.axiosService.get<IUserInfo>('auth/me/');
  }

  async registerPatient(payload: IUpdatePatientPayload) {
    return this.axiosService.post<IPatient>('patient/register/', payload);
  }

  async getConditionMetadata(category?: string) {
    return this.axiosService.get<ICondition[]>('metadata/condition/', {
      params: { category },
    });
  }

  async searchPatient(params: ISearchPatientQuery) {
    return this.axiosService.get<IPaginatedResponse<IPatient>>(
      'patient/search/',
      {
        params,
      },
    );
  }

  async getPatientConditions(patientId: string) {
    return this.axiosService.get<IPatientCondition[]>(
      `patient/${patientId}/patient-condition/`,
    );
  }

  async bulkUpdatePatientConditions(
    patientId: string,
    payload: IBulkUpdatePatientConditionPayload,
  ) {
    return this.axiosService.post<IPatientCondition[]>(
      `patient/${patientId}/patient-condition/`,
      payload,
    );
  }

  async getMedicalRecord(patientId: string) {
    return this.axiosService.get<IPatientRecord>(`medical-record/${patientId}`);
  }

  async getAllergies() {
    return this.axiosService.get<IAllergy[]>('metadata/allergy/');
  }

  async getAlerts() {
    return this.axiosService.get<IAlert[]>('metadata/flag/');
  }

  async addPatientAlert(payload: IPatientAlert) {
    return this.axiosService.post<IPatientAlert>(
      `patient/${payload.patient}/patient-flag/`,
      payload,
    );
  }

  async updatePatientAlert(payload: IPatientAlert) {
    return this.axiosService.patch<IPatientAlert>(
      `patient/${payload.patient}/patient-flag/${payload.id}/`,
      payload,
    );
  }

  async deletePatientAlert(payload: IPatientAlert) {
    return this.axiosService.delete<IPatientAlert>(
      `patient/${payload.patient}/patient-flag/${payload.id}/`,
    );
  }

  async addPatientAllergy(payload: IPatientAllergy) {
    return this.axiosService.post<IPatientAllergy>(
      `patient/${payload.patient}/patient-allergy/`,
      payload,
    );
  }

  async updatePatientAllergy(payload: IPatientAllergy) {
    return this.axiosService.patch<IPatientAllergy>(
      `patient/${payload.patient}/patient-allergy/${payload.id}/`,
      payload,
    );
  }

  async deletePatientAllergy(payload: IPatientAllergy) {
    return this.axiosService.delete<IPatientAllergy>(
      `patient/${payload.patient}/patient-allergy/${payload.id}/`,
    );
  }

  async getMeasures(measure_type: string) {
    return this.axiosService.get<IMeasure[]>(
      `metadata/measure/?type=${measure_type}`,
    );
  }

  async getPatientMeasures(patientId: string, measure_type: string) {
    return this.axiosService.get<IPatientMeasurePivot>(
      `patient/${patientId}/patient-measure-pivot/?type=${measure_type}`,
    );
  }

  async addPatientMeasure(payload: ITodayeMeasureValue) {
    return this.axiosService.post(
      `patient/${payload.patient}/patient-measure/`,
      payload,
    );
  }

  async searchFacilities(query: ISearchFacilityQuery = {}) {
    return this.axiosService.get<IPaginatedResponse<IFacility>>(
      'facility/search/',
      {
        params: query,
      },
    );
  }

  async searchFacilityAppointments(
    facilityId: string,
    query: ISearchFacilityAppointmentsQuery = {},
  ) {
    return this.axiosService.get<IAppointment[]>(
      `facility/${facilityId}/appointment/`,
      {
        params: query,
      },
    );
  }

  async searchPractitioners(params: ISearchPractitionerQuery = {}) {
    return this.axiosService.get<IPaginatedResponse<IPractitioner>>(
      'team/search/',
      {
        params,
      },
    );
  }

  async registerPatientAppointment(
    payload: IRegisterPatientAppointmentPayload,
  ) {
    return this.axiosService.post<IAppointment>(
      `patient/${payload.patient}/appointment/`,
      payload,
    );
  }

  async updateAppointmentAction(
    appointmentId: string,
    action: AppointmentAction,
  ) {
    return this.axiosService.post(`appointment/${appointmentId}/${action}/`);
  }

  async updatePatientAppointment(
    patientId: string,
    appointmentId: string,
    payload: Partial<IAppointment>,
  ) {
    return this.axiosService.patch(
      `patient/${patientId}/appointment/${appointmentId}/`,
      payload,
    );
  }

  async getPatientEncounters(patientId: string) {
    return this.axiosService.get<IEncounter[]>(
      `encounter/${patientId}/encounter/`,
    );
  }

  async getPatientEncounter(encounterId: string) {
    return this.axiosService.get<IEncounter>(`/encounter/${encounterId}`);
  }

  async addPatientEncounter(payload: IEncounter) {
    return this.axiosService.post(
      `encounter/${payload.patient}/encounter/`,
      payload,
    );
  }

  async updatePatientEncounter(encounterId: string, payload: IEncounter) {
    return this.axiosService.patch(`encounter/${encounterId}/`, payload);
  }

  async getEncounterItems(encounterId: string, key: string) {
    return this.axiosService.get(`encounter/${encounterId}/${key}/`);
  }

  async addEncounterItem(
    payload: IEncounterItem | IEncounterFollowup,
    key: string,
  ) {
    return this.axiosService.post(
      `encounter/${payload.encounter}/${key}/`,
      payload,
    );
  }

  async deleteEncounterItem(
    payload: IEncounterItem | IEncounterFollowup,
    key: string,
  ) {
    return this.axiosService.delete(
      `encounter/${payload.encounter}/${key}/${payload.id}`,
    );
  }

  async getMetaData<T, R>(key: string, params?: T) {
    return this.axiosService.get<R[]>(`metadata/${key}`, {
      params,
    });
  }

  async getlabTestProfileItems(profileId: number) {
    return this.axiosService.get<ITestProfileItem[]>(
      `metadata/lab_test_profile_item?profile_id=${profileId}`,
    );
  }

  async addImagingOrder(payload: IScanPayload) {
    return this.axiosService.post(
      `imaging/${payload.facility}/order/`,
      payload,
    );
  }

  async deleteImagingOrder(payload: IEncounterImagingOrder) {
    return this.axiosService.delete(
      `imaging/${payload.facility}/order/${payload.id}`,
    );
  }

  async addLabOrder(payload: ILabOrderPayload) {
    return this.axiosService.post(`lab/${payload.facility}/order/`, payload);
  }

  async deleteLabOrder(payload: IEncounterLabOrder) {
    return this.axiosService.delete(
      `lab/${payload.facility}/order/${payload.id}`,
    );
  }

  async getPatient(patientId: string) {
    return this.axiosService.get<IPatient>(`patient/${patientId}/`);
  }

  async updatePatient(patientId: string, payload: IUpdatePatientPayload) {
    return this.axiosService.put<IPatient>(`patient/${patientId}/`, payload);
  }

  async searchImagingOrders(facilityId: string, params: IImagingOrderQuery) {
    return this.axiosService.get<IPaginatedResponse<IImagingOrder>>(
      `imaging/${facilityId}/order/`,
      {
        params,
      },
    );
  }

  async getImagingScans(facilityId: string, imagingOrderId: number) {
    return this.axiosService.get<IScan[]>(
      `imaging/${facilityId}/order/${imagingOrderId}/imaging-scan/`,
    );
  }

  async addMedicationOrder(
    facilityId: string,
    payload: IMedicationOrderPayload,
  ) {
    return this.axiosService.post(`medication/${facilityId}/order/`, payload);
  }

  async deleteMedicationOrder(facilityId: string, medicationOrderId: number) {
    return this.axiosService.delete(
      `medication/${facilityId}/order/${medicationOrderId}`,
    );
  }

  async searchLabOrders(facilityId: string, params: ILabOrderQuery) {
    return this.axiosService.get<IPaginatedResponse<ILabOrder>>(
      `lab/${facilityId}/order/`,
      {
        params,
      },
    );
  }

  async getLabTests(facilityId: string, labOrderId: number) {
    return this.axiosService.get<ILabOrderTest[]>(
      `lab/${facilityId}/order/${labOrderId}/lab-test/`,
    );
  }

  async searchMedicationOrders(
    facilityId: string,
    params: IMedicationOrderQuery,
  ) {
    return this.axiosService.get<IPaginatedResponse<IMedicationOrder>>(
      `medication/${facilityId}/order/`,
      {
        params,
      },
    );
  }

  async getMedicationItems(facilityId: string, medicationOrderId: number) {
    return this.axiosService.get<IMedicationOrderItem[]>(
      `medication/${facilityId}/order/${medicationOrderId}/medication/`,
    );
  }

  async searchInvoices(facilityId: string, params: IInvoiceQuery) {
    return this.axiosService.get<IPaginatedResponse<IInvoice>>(
      `billing/${facilityId}/invoice/`,
      { params },
    );
  }

  async getConfigs(facilityId: string, params: IConfigQuery) {
    return this.axiosService.get<IPaginatedResponse<IConfig>>(
      `config/${facilityId}/`,
      {
        params,
      },
    );
  }

  async getInvoiceItems(facilityId: string, invoiceId: string) {
    return this.axiosService.get<IInvoiceItem[]>(
      `billing/${facilityId}/invoice/${invoiceId}/item/`,
    );
  }

  async getProducts(facilityId: string) {
    return this.axiosService.get<IProduct[]>(`billing/${facilityId}/product/`);
  }

  async createInvoice(facilityId: string, payload: IInvoicePayload) {
    return this.axiosService.post(`billing/${facilityId}/invoice/`, payload);
  }

  async searchPayments(facilityId: string, params: IPaymentQuery) {
    return this.axiosService.get<IPaginatedResponse<IPayment>>(
      `billing/${facilityId}/payment/`,
      { params },
    );
  }

  async getMetaDataICDCodes(params: IMetaDataICDCodeQuery) {
    return this.axiosService.get<IMetaDataICDCode[]>('metadata/icd-code/', {
      params,
    });
  }
}
