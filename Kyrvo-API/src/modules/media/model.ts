import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Media';
export const MediaSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Type: z.string(),
  Active: z.number(),
  Url: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Media = z.infer<typeof MediaSchema>;

export const mediaModel = baseModel.defaultActions(TABLE);
