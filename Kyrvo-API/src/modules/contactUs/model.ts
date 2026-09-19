import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'ContactUs';
export const ContactUsSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Email: z.string(),
  Message: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type ContactUs = z.infer<typeof ContactUsSchema>;

export const contactUsModel = baseModel.defaultActions<ContactUs>(TABLE);
