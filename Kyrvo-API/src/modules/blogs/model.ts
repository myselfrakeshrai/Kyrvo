import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'BlogPost';
export const BlogpostSchema = z.object({
  Id: z.string(),
  Title: z.string(),
  Body: z.string(),
  FeaturedImage: z.string().nullable().optional(),
  Images: z.string().optional(),
  Views: z.number().optional(),
  AuthorId: z.string().optional(),
  Category: z.string().nullable().optional(),
  Tags: z.string().nullable().optional(),
  Published: z.number().optional(),
  IsFeatured: z.number().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Blogpost = z.infer<typeof BlogpostSchema>;

export const blogpostModel = baseModel.defaultActions<Blogpost>(TABLE);
