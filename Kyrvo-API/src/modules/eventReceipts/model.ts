import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'EventReceipt';
export const EventReceiptSchema = z.object({
  Id: z.string(),
  EventId: z.string(),
  EventTicketTypeId: z.string(),
  UserId: z.string(),
  IsPaid: z.boolean(),
  IsUsed: z.boolean(),
  Quantity: z.number(),
  TaxAmount: z.number().optional(),
  TotalPrice: z.number(),
  Remarks: z.string().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type EventReceipts = z.infer<typeof EventReceiptSchema>;

export const eventReceiptsModel = baseModel.defaultActions<EventReceipts>(TABLE);
