import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
import { AgencySchema } from '../agencies/model';
const TABLE = 'Agent';
export const AgentSchema = z.object({
  Id: z.string(),
  AgencyId: z.string(),
  AgencyRole: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Phone: z.string(),
  Email: z.string(),
  Address1: z.string(),
  Address2: z.string(),
  City: z.string(),
  State: z.string(),
  PostalCode: z.string(),
  IsActive: z.number(),
  Remarks: z.string(),
  Meta: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Agent = z.infer<typeof AgencySchema>;

export const agentModel = baseModel.defaultActions<Agent>(TABLE);
