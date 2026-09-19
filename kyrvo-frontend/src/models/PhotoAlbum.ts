export interface PhotoAlbum {
  Id?: string;
  Name: string;
  Description?: string | null;
  Images: string;
  Type: number;
  CreatedOn?: number;
  UpdatedOn?: number;
}
