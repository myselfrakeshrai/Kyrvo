import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Orders';
export const OrderSchema = z.object({
  Id: z.string(),
  OrderNumber: z.number(),
  Tax: z.number(),
  TotalPrice: z.number(),
  GrandTotal: z.number(),
  Tips: z.number(),
  DiscountCoupon: z.string().optional(),
  DiscountAmount: z.number().optional(),
  PaymentMethod: z.string(),
  PaymnetStatus: z.number(),
  CustomerId: z.string().optional(),
  Status: z.number(),
  EstDuration: z.number(),
  OrderMethod: z.string(),
  OrderType: z.string(),
  OrderDate: z.number(),
  TableId: z.number().optional(),
  ServerId: z.string().optional(),
  Remarks: z.string().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Orders = z.infer<typeof OrderSchema>;

export const orderModel = baseModel.defaultActions<Orders>(TABLE);
