import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import {
  EventCategory,
  EventcategorySchema,
  eventcategoryModel,
} from './model';

const routes = baseRoute<EventCategory>(eventcategoryModel);
const group = 'Eventcategory';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Categories',
    summary: 'Retrieve all Categories',
    schema: EventcategorySchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Category by Id',
    summary: 'Retrive a Category by Id',
    schema: EventcategorySchema,
    group: group,
    params: EventcategorySchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Category',
    summary: 'Add a Category',
    schema: EventcategorySchema,
    group: group,
    body: EventcategorySchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.CATEGORIES, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Category by Id',
    summary: 'Retrive Category by log Id',
    schema: EventcategorySchema,
    group: group,
    body: EventcategorySchema.omit({ Id: true }),
    params: EventcategorySchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.CATEGORIES, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Category by Id',
    summary: 'Retrive Category by log Id',
    schema: EventcategorySchema,
    group: group,
    params: EventcategorySchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.CATEGORIES,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/eventcategory',
};
