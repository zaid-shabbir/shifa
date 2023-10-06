import { ICity, ICountry } from '../common';
import { IReview } from '../review';
import { IUser } from '../user';
import { IFacilityType } from './faility-type';

export interface IFacility {
  id: string;
  reviews: IReview[];
  created_date: Date;
  is_active: boolean;
  soft_delete: boolean;
  deleted_date?: Date;
  name: string;
  name_arabic: string;
  name_kurdish: string;
  description: string;
  description_arabic: string;
  description_kurdish: string;
  address: string;
  contact_number: string;
  contact_email: string;
  logo: string;
  created_by_user: IUser;
  deleted_by_user: IUser;
  facility_type: IFacilityType;
  city: ICity;
  country: ICountry;
}
