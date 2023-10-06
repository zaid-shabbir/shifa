export interface IPractitioner {
  id: string;
  reviews: string[],
  first_name: string;
  last_name: string;
  email: string;
  preferred_language: string;
  is_active: boolean;
  qualification: string;
  experience_years: number;
  bio: string;
  contact_number: string;
  address: string;
  created_date: string;
  updated_date: string;
  user: string;
  role: number,
  specialty: number;
  city: number,
  ethnicity: string;
  religion: string;
  facilities: string[];
}
