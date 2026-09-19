import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'EventTicketType';
export const EventTicketTypeSchema = z.object({
  Id: z.string(),
  Title: z.string(),
  Description: z.string().optional(),
  Price: z.number(),
  IsActive: z.number(),
  MaxQuantity: z.number().optional(),
  AllowMultiple: z.number(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type EventTicketType = z.infer<typeof EventTicketTypeSchema>;

export const eventTicketTypeModel = baseModel.defaultActions<EventTicketType>(TABLE);
