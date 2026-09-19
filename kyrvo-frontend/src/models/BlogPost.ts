export interface BlogPost {
  Id?: string;
  Title: string;
  Body: string;
  FeaturedImage?: string | null;
  AuthorId?: string;
  Images?: string;
  Views?: number;
  Category?: string | null;
  Tags?: string | null;
  Published?: number;
  IsFeatured? : number;
  CreatedOn?: number;
  UpdatedOn?: number;
}
