import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Reservations';
export const ReservationSchema = z.object({
  Id: z.string(),
  Email: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  PhoneNumber: z.string(),
  PickupDate: z.number(),
  PickupTime: z.number(),
  Hours: z.number(),
  DropoffDate: z.number(),
  DropoffTime: z.number(),
  PickupLocation: z.string(),
  Flight: z.string(),
  DropoffLocation: z.string(),
  Price: z.number(),
  Distance: z.number(),
  IsPaid: z.number(),
  PaymentMethod: z.string(),
  AgencyId: z.string(),
  VehicleId: z.string(),
  AgentId: z.string(),
  ReservationType: z.string(),
  Remarks: z.string(),
  UserId: z.string(),
  RefId: z.string(),
  Duration: z.string(),
  DurationSecs: z.number(),
  DistanceText: z.string(),
  VehicleType: z.string(),
  Status: z.number(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Reservation = z.infer<typeof ReservationSchema>;

export const reservationModel = baseModel.defaultActions<Reservation>(TABLE);
