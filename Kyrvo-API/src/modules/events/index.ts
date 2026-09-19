import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { EventsSchema, Events, eventModel } from './model';

const routes = baseRoute<Events>(eventModel);
const group = 'Events';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all events',
    summary: 'Retrieve all events',
    schema: EventsSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a event by Id',
    summary: 'Retrive a event by Id',
    schema: EventsSchema,
    group: group,
    params: EventsSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a event',
    summary: 'Add a event',
    schema: EventsSchema,
    group: group,
    body: EventsSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.EVENTS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a event by Id',
    summary: 'Retrive event by log Id',
    schema: EventsSchema,
    group: group,
    body: EventsSchema.omit({ Id: true }),
    params: EventsSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.EVENTS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a event by Id',
    summary: 'Retrive event by log Id',
    schema: EventsSchema,
    group: group,
    params: EventsSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.delete, FEATURES.EVENTS, PERMISSION.DELETE),
  },
]);

export default {
  route: app,
  path: '/event',
};
