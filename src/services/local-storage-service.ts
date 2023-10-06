// types
import { IToken } from '@/types';

export class LocalStorageService {
  private static instance: LocalStorageService;

  constructor() {}

  static getInstance() {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }

    return LocalStorageService.instance;
  }

  getToken(): IToken {
    const token = localStorage.getItem('token');
    return token && JSON.parse(token);
  }

  setToken(token: IToken) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getAccessToken() {
    const token = this.getToken();
    return token?.access;
  }

  getRefreshToken() {
    const token = this.getToken();
    return token?.refresh;
  }

  setCurrentPatientId(currentPatientId: string) {
    localStorage.setItem('currentPatientId', currentPatientId);
  }

  getCurrentPatientId() {
    return localStorage.getItem('currentPatientId');
  }

  setCurrentFacilityId(currentFacilityId: string) {
    localStorage.setItem('currentFacilityId', currentFacilityId);
  }

  getCurrentFacilityId() {
    return localStorage.getItem('currentFacilityId');
  }

  clear() {
    localStorage.clear();
  }
}
