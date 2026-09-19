import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'EventTag';
export const EventTagSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type EventTag = z.infer<typeof EventTagSchema>;

export const eventTagModel = baseModel.defaultActions<EventTag>(TABLE);
