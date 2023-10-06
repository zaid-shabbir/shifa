export interface IUser {
  id: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  date_joined: Date;
  username: string;
  account_type: string;
  preferred_language: string;
  preferred_contact_method: string;
  is_active: boolean;
  is_superuser: boolean;
  last_login: string;
  groups: any[];
  user_permissions: any[];
}
