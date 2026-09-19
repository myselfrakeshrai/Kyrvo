import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Vehicle';
export const VehicleSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Desc: z.string(),
  VehicleTypeId: z.string(),
  Image: z.string(),
  LocationId: z.string(),
  AgencyId: z.string(),
  AgentId: z.string(),
  Vin: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

export const vehicleModel = baseModel.defaultActions<Vehicle>(TABLE);
