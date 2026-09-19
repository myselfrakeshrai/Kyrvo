import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'BlogTag';
export const BlogtagSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Blogtag = z.infer<typeof BlogtagSchema>;

export const blogtagModel = baseModel.defaultActions<Blogtag>(TABLE);
