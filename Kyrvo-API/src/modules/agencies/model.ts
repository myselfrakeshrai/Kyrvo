import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Agency';
export const AgencySchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Address1: z.string(),
  Address2: z.string(),
  City: z.string(),
  State: z.string(),
  Email: z.string(),
  PostalCode: z.string(),
  Phone: z.string(),
  Images: z.string(),
  IsActive: z.number(),
  Meta: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Agency = z.infer<typeof AgencySchema>;

export const agencyModel = baseModel.defaultActions<Agency>(TABLE);
