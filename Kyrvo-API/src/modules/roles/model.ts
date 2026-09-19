import * as baseModel from 'shared/baseModel';
import { z } from 'zod';
const TABLE = 'Roles';
export const RoleSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Desc: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Role = z.infer<typeof RoleSchema>;

export const roleModel = baseModel.defaultActions<Role>(TABLE);
