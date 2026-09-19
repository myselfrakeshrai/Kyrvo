import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Collection, CollectionSchema, collectionsModel } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';

const routes = baseRoute<Collection>(collectionsModel);
const group = 'Collection';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all collections',
    summary: 'Retrieve all collections',
    schema: CollectionSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a collection by Id',
    summary: 'Retrive a collection by Id',
    schema: CollectionSchema,
    group: group,
    params: CollectionSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a collection',
    summary: 'Add a collection',
    schema: CollectionSchema,
    group: group,
    body: CollectionSchema,
    handler: (c) =>
      requiredPermission(
        c,
        routes.post,
        FEATURES.COLLECTIONS,
        PERMISSION.WRITE,
      ),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Collection by Id',
    summary: 'Retrive Collection by log Id',
    schema: CollectionSchema,
    group: group,
    body: CollectionSchema,
    params: CollectionSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.put,
        FEATURES.COLLECTIONS,
        PERMISSION.UPDATE,
      ),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Collection by Id',
    summary: 'Retrive Collection by log Id',
    schema: CollectionSchema,
    group: group,
    params: CollectionSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.COLLECTIONS,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/collection',
};
