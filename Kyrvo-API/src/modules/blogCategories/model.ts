import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'BlogCategory';
export const BlogcategorySchema = z.object({
  Id: z.string(),
  Name: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type BlogCategory = z.infer<typeof BlogcategorySchema>;

export const blogcategoryModel = baseModel.defaultActions<BlogCategory>(TABLE);