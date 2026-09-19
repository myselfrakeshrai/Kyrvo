import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'VehicleTypes';
export const VehicleTypeSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Desc: z.string(),
  Image: z.string(),
  Seats: z.number(),
  Luggages: z.number(),
  Price: z.number(),
  HourlyPrice: z.number(),
  DiscountedPrice: z.number(),
  BasePrice: z.number(),
  DiscountedDistance: z.number(),
  MinMileage: z.number(),
  MaxMileage: z.number(),
  MileageUnit: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type VehicleType = z.infer<typeof VehicleTypeSchema>;

export const vehicleTypeModel = baseModel.defaultActions<VehicleType>(TABLE);
