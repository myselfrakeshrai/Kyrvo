import { z } from 'zod';
import * as baseModel from '../shared/baseModel';
const TABLE = 'Permissions';
export const PermissionSchema = z.object({
  Id: z.string(),
  RoleId: z.string(),
  FeatureId: z.string(),
  PermissionLevel: z.number(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Permission = z.infer<typeof PermissionSchema>;

export const permissionModel = baseModel.defaultActions<Permission>(TABLE);
