export interface VehicleTypes {
  Id?: string;
  Name: string;
  Desc: string;
  Image?: string;
  Seats: number;
  Luggages: number;
  Price: number;
  DiscountedPrice: number;
  BasePrice: number;
  HourlyPrice: number;
  DiscountedDistance: number;
  MinMileage?: number;
  MaxMileage?: number;
  MileageUnit?: string;
  CreatedOn?: number;
  UpdatedOn?: number;
}
