import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Collections';
export const CollectionSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Description: z.string().nullable().optional(),
  JsonSchema: z.string(),
  UiSchema: z.string().nullable().optional(),
  Data: z.string().nullable().optional(),
  AddToMenu: z.number().optional(),
  IsFeatured: z.number().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Collection = z.infer<typeof CollectionSchema>;

export const collectionsModel = baseModel.defaultActions<Collection>(TABLE);
