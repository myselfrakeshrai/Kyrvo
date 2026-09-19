export interface OrderItem {
  Id?: string;
  OrderId: string;
  ItemId: string;
  Quantity: number;
  CreatedOn?: number;
  UpdatedOn?: number;
}
