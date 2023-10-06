export interface IConfig {
  id: number;
  created_date: string;
  is_active: boolean;
  soft_delete: boolean;
  deleted_date: string;
  name: string;
  name_display: string;
  group: string;
  sub_group: string;
  entity: string;
  entity_id: string;
  entity_id_type: string;
  value: string;
  value_type: string;
  created_by_user: string;
  deleted_by_user: string;
  facility: string;
}

export interface IConfigQuery {
  entity?: string;
  entity_id?: string;
  name?: string;
}
