import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Review';
export const ReviewSchema = z.object({
  Id: z.string(),
  ItemId: z.string(),
  Description: z.string(),
  Quality: z.number(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Review = z.infer<typeof ReviewSchema>;

export const reviewModel = baseModel.defaultActions<Review>(TABLE);