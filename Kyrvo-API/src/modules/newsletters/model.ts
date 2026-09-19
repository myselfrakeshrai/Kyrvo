import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'NewsLetter';
export const NewsLetterSchema = z.object({
  Id: z.string(),
  Email: z.string(),
  Subscribed: z.number().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type NewsLetter = z.infer<typeof NewsLetterSchema>;

export const newsLetterModel = baseModel.defaultActions<NewsLetter>(TABLE);
