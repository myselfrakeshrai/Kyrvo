import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Notification';
export const NotificationSchema = z.object({
  Id: z.string(),
  Type: z.string(),
  TypeId: z.string(),
  UserId: z.string(),
  Message: z.string(),
  IsProcessed: z.number(),
  ProcessedBy: z.string(),
  Remarks: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});
export type Notification = z.infer<typeof NotificationSchema>;
export const notificationModel = baseModel.defaultActions<Notification>(TABLE);
