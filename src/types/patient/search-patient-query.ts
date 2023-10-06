import { IPaginationQuery } from '../common';

export interface ISearchPatientQuery extends IPaginationQuery {
  date_of_birth?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  health_id?: string;
  phone?: string;
  email?: string;
  query?: string;
}
