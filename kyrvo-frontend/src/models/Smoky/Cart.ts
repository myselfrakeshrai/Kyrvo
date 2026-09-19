export interface Cart {
  Id?: string;
  OrderId: string;
  ItemId: string;
  Name: string;
  Image: string;
  Description: string;
  Total: number;
  Quantity: number;
}