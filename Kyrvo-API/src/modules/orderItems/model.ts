import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'OrderItem';
export const OrderItemSchema = z.object({
  Id: z.string(),
  OrderId: z.string(),
  ItemId: z.string(),
  Quantity: z.number(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

export const orderItemModel = baseModel.defaultActions<OrderItem>(TABLE);