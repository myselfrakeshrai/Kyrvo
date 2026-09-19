export interface Orders {
  Id?: string;
  OrderNumber: number;
  Tax: number;
  TotalPrice: number;
  GrandTotal: number;
  Tips: number;
  DiscountCoupon?: string;
  DiscountAmount?: number;
  PaymentMethod: string;
  PaymnetStatus: number;
  CustomerId?: string;
  Status: number;
  EstDuration: number;
  OrderMethod: string;
  OrderType: string;
  OrderDate: number;
  TableId?: number;
  ServerId?: string;
  Remarks?: string;
  CreatedOn?: number;
  UpdatedOn?: number;
}