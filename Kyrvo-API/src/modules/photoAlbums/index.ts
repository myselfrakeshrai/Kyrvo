import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'helpers/openaApiRoute';
import { PhotoAlbum, PhotoAlbumSchema, photoAlbumModel } from './model';
import { requiredPermission } from 'shared/utils/permission';
import { FEATURES, PERMISSION } from 'shared/const';

const routes = baseRoute<PhotoAlbum>(photoAlbumModel);

const group = 'PhotoAlbums';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Photo Albums',
    summary: 'Retrieve all Photo Albums',
    schema: PhotoAlbumSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Photo Album by Id',
    summary: 'Retrive a Photo Album by Id',
    schema: PhotoAlbumSchema,
    group: group,
    params: PhotoAlbumSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Photo Album',
    summary: 'Add a post',
    schema: PhotoAlbumSchema,
    group: group,
    body: PhotoAlbumSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.PHOTOALBUM, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Photo Album by Id',
    summary: 'Retrive Photo Album by log Id',
    schema: PhotoAlbumSchema,
    group: group,
    body: PhotoAlbumSchema.omit({ Id: true }),
    params: PhotoAlbumSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.PHOTOALBUM, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Photo Album by Id',
    summary: 'Retrive Photo Album by log Id',
    schema: PhotoAlbumSchema,
    group: group,
    params: PhotoAlbumSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.PHOTOALBUM,
        PERMISSION.DELETE,
      ),
  },
]);
export default {
  route: app,
  path: '/photoalbum',
};
