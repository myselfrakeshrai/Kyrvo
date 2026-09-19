import { z } from "zod";
import * as baseModel from "shared/baseModel";
const TABLE = "Features";
export const FeatureSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Desc: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Feature = z.infer<typeof FeatureSchema>;

export const featureModel = baseModel.defaultActions<Feature>(TABLE);
