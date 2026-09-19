import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Variables';

export const VariableSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Description: z.string(),
  Type: z.string(),
  Value: z.string(),
  VarGroup: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});
export type Variable = z.infer<typeof VariableSchema>;

export const variableModel = baseModel.defaultActions<Variable>(TABLE);
