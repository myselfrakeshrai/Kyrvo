import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'MenuItem';
export const MenuItemSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Description: z.string(),
  Price: z.number(),
  Category: z.string(),
  MealType: z.string(),
  PrepTime: z.number().optional(),
  Active: z.number(),
  Images: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;

export const menuItemModel = baseModel.defaultActions<MenuItem>(TABLE);
