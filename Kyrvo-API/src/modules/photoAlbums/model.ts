import { z } from 'zod';
import * as baseModel from '../shared/baseModel';
const TABLE = 'PhotoAlbums';
export const PhotoAlbumSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Description: z.string().optional(),
  Type: z.number(),
  Images: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type PhotoAlbum = z.infer<typeof PhotoAlbumSchema>;

export const photoAlbumModel = baseModel.defaultActions<PhotoAlbum>(TABLE);
