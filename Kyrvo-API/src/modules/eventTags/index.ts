import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { EventTag, EventTagSchema, eventTagModel } from './model';

const routes = baseRoute<EventTag>(eventTagModel);
const group = 'EventTag';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Event tags',
    summary: 'Retrieve all Event tags',
    schema: EventTagSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Event tag by Id',
    summary: 'Retrive a Event tag by Id',
    schema: EventTagSchema,
    group: group,
    params: EventTagSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Event tag',
    summary: 'Add a post',
    schema: EventTagSchema,
    group: group,
    body: EventTagSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.EVENTS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Event tag by Id',
    summary: 'Retrive Event tag by log Id',
    schema: EventTagSchema,
    group: group,
    body: EventTagSchema.omit({ Id: true }),
    params: EventTagSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.EVENTS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Event tag by Id',
    summary: 'Retrive Event tag by log Id',
    schema: EventTagSchema,
    group: group,
    params: EventTagSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.EVENTS,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/eventtag',
};
