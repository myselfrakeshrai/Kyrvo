import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import {
  CollectionData,
  CollectionDataSchema,
  collectionDataModel,
} from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';

const routes = baseRoute<CollectionData>(collectionDataModel);
const group = 'CollectionData';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all collection data',
    summary: 'Retrieve all collection data',
    schema: CollectionDataSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a collection data by Id',
    summary: 'Retrive a collection data by Id',
    schema: CollectionDataSchema,
    group: group,
    params: CollectionDataSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a collection data',
    summary: 'Add a collection data',
    schema: CollectionDataSchema,
    group: group,
    body: CollectionDataSchema,
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
    description: 'Get a Collection data by Id',
    summary: 'Retrive Collection data by log Id',
    schema: CollectionDataSchema,
    group: group,
    body: CollectionDataSchema.omit({ Id: true }),
    params: CollectionDataSchema.pick({ Id: true }),
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
    description: 'Get a Collection data by Id',
    summary: 'Retrive Collection data by log Id',
    schema: CollectionDataSchema,
    group: group,
    params: CollectionDataSchema.pick({ Id: true }),
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
  path: '/cdata',
};
