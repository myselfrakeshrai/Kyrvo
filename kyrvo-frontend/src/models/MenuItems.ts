export interface MenuItems {
  Id?: string;
  Name: string;
  Description?: string | null;
  Price: number;
  Category: string;
  MealType: string;
  PrepTime?: number;
  Active: number;
  Images?: string | null;
  CreatedOn?: number;
  UpdatedOn?: number;
}
