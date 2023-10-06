export interface ICity {
  id: number;
  country: string;
  location_city_centre: string;
  name: string;
  name_arabic: string | null;
  name_kurdish: string | null;
  name_persian: string | null;
  name_turkish: string | null;
}

export enum ContactMethod {
  Phone = 1,
  OnlineWebsite = 2,
  OnlineMobileApp = 3,
  OfflineVisitToFacility = 4,
}

export interface ICountry {
  iso_code: string;
  name: string;
  name_arabic?: string;
  name_kurdish?: string;
  name_turkish?: string;
  name_persian?: string;
  is_active: boolean;
}

export interface IEthnicity {
  code: string;
  is_active: boolean;
  name: string;
  name_arabic: string | null;
  name_kurdish: string | null;
}

export interface ILanguage {
  is_active: boolean;
  iso_code: string;
  name: string;
  code: string;
  name_arabic: string | null;
  name_kurdish: string | null;
}

export interface IPaginatedResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface IReligion {
  code: string;
  is_active: boolean;
  name: string;
  name_arabic: string | null;
  name_kurdish: string | null;
}

export interface IRole {
  id: number;
  name: string;
  role_type: string;
  name_arabic: string;
  name_kurdish: string;
  is_active: boolean;
}

export interface ISpecialty {
  id: number;
  name: string;
  name_arabic: string;
  name_kurdish: string;
  description: string;
  description_arabic: string;
  description_kurdish: string;
  icon: string;
  image: string;
  is_active: boolean;
  facility_type: number;
}

export interface ICodeName {
  code: string;
  name: string;
  description?: string;
}

export interface IIdName {
  id: string;
  name: string;
}

export interface IPaginationQuery {
  page?: number;
}

export interface ITableUpdateOptions {
  page?: number;
  itemsPerPage?: number;
  sortBy?: number;
}

export interface IKeyName {
  key: string;
  name: string;
}

export interface IKeyNames {
  key: string;
  name: string;
  short_name: string;
}

export interface ITableHeader {
  key: string;
  title: string;
  name: string;
  sortable?: boolean;
}

export interface ICurrency {
  name: string;
  code: string;
  symbol: string;
  is_active: boolean;
  name_arabic: string | null;
  name_kurdish: string | null;
}
