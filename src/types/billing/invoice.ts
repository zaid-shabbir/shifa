import { ICodeName, ICurrency, IPaginationQuery } from '../common';

export interface IInvoice {
  id: string;
  item_count: number;
  created_date: string;
  is_active: boolean;
  soft_delete: boolean;
  deleted_date: string;
  invoice_number: string;
  invoice_date: string;
  total_amount: string;
  status: ICodeName;
  created_by_user: string;
  deleted_by_user: string;
  patient: string;
  patient_name: string;
  facility: string;
  practitioner: string;
  practitioner_name: string;
  encounter: string;
  currency: ICurrency;
}

export interface IInvoiceItem {
  id: number;
  product: number;
  product_name: string;
  invoice: string;
  description: string;
  quantity: number;
  item_price: string;
  item_amount: string;
  item_discount_amount: string;
  item_amount_total: string;
  status: string;
  currency: ICurrency;
}

export interface IInvoiceQuery extends IPaginationQuery {
  encounter_id?: string;
  from_date?: string;
  to_date?: string;
  invoice_status?: string;
  invoice_number?: string;
  patient_id?: string;
  practitioner_id?: string;
}

export interface IProduct {
  id: number;
  facility: string;
  product: number;
  product_name: string;
  price: string;
  currency: string;
  is_active: boolean;
  auto_include_in_invoice: boolean;
}

export interface IInvoiceItemPayload {
  product: number;
  quantity: number;
  item_price: number;
  item_discount_amount: number;
  currency: string;
}

export interface IInvoicePayload {
  patient: string;
  facility: string;
  practitioner: string;
  encounter: string;
  currency: string;
  invoice_items: IInvoiceItemPayload[];
  notes?: string;
}

export interface IInvoiceItemRow {
  productId?: number;
  quantity?: number;
  price?: number;
  currency?: string;
  amount?: number;
  discount?: number;
}
