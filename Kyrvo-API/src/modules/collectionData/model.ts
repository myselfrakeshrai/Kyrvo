import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'CollectionData';
export const CollectionDataSchema = z.object({
  Id: z.string(),
  Data: z.string().nullable().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type CollectionData = z.infer<typeof CollectionDataSchema>;

export const collectionDataModel =
  baseModel.defaultActions<CollectionData>(TABLE);
