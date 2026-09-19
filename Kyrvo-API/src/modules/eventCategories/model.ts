import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'EventCategory';
export const EventcategorySchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Images: z.string().optional(),
  Description: z.string().optional(),
  DisplayOrder: z.number().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type EventCategory = z.infer<typeof EventcategorySchema>;

export const eventcategoryModel =
  baseModel.defaultActions<EventCategory>(TABLE);
