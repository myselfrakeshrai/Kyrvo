import { z } from 'zod';
import * as baseModel from 'shared/baseModel';
const TABLE = 'Events';
export const EventsSchema = z.object({
  Id: z.string(),
  Title: z.string(),
  Body: z.string(),
  EventTicketTypeId: z.string(),
  FeaturedImage: z.string().nullable().optional(),
  Images: z.string().optional(),
  Venue: z.string().optional(),
  Views: z.number().optional(),
  UserId: z.string().optional(),
  Category: z.string().nullable().optional(),
  Tags: z.string().nullable().optional(),
  OrganizerId: z.string().optional(),
  OrganizerNumber: z.number().optional(),
  OrganizerEmail: z.string().optional(),
  EventWebsite: z.string().optional(),
  Published: z.number().optional(),
  IsFeatured: z.number().optional(),
  ScheduledDate: z.string().optional(),
  ScheduledTime: z.string().optional(),
  EndDate: z.string().optional(),
  EndTime: z.string().optional(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Events = z.infer<typeof EventsSchema>;

export const eventModel = baseModel.defaultActions<Events>(TABLE);
