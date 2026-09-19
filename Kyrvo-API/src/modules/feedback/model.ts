import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'FeedBack';
export const FeedBackSchema = z.object({
  Id: z.string(),
  FeedbackImage: z.string(),
  FeedbackDesc: z.string(),
  FeedbackName: z.string(),
  FeedbackUsername: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type FeedBack = z.infer<typeof FeedBackSchema>;
export const feedBackModel = baseModel.defaultActions<FeedBack>(TABLE);
