export interface Event {
  Id?: string;
  Title: string;
  Body: string;
  EventTicketTypeId: string;
  FeaturedImage?: string | null;
  Images?: string;
  Venue?: string;
  Views?: number;
  UserId?: string;
  OrganizerId?: string;
  Organizer?: string;
  OrganizerNumber?: number;
  OrganizerEmail?: string;
  EventWebsite?: string;
  Category?: string | null;
  Tags?: string | null;
  Published?: number;
  IsFeatured?: number;
  ScheduledDate?: string;
  ScheduledTime?: string;
  EndDate?: string;
  EndTime?: string;
  CreatedOn?: number;
  UpdatedOn?: number;
}
