export interface Events {
  Id: string;
  Title: string;
  Body: string;
  FeaturedImage?: string | null;
  Images?: string;
  Venue?: string;
  Views?: number;
  UserId?: string;
  Category?: string | null;
  Tags?: string | null;
  Published?: number;
  IsFeatured?: number;
  ScheduledOn?: number;
  CreatedOn?: number;
  UpdatedOn?: number;
}