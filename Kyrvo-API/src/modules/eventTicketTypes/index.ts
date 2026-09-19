import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { EventTicketType, EventTicketTypeSchema, eventTicketTypeModel } from './model';

const routes = baseRoute<EventTicketType>(eventTicketTypeModel);
const group = 'EventTicketTypes';

const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Event Types',
    summary: 'Retrieve all Event Types',
    schema: EventTicketTypeSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Event Type by Id',
    summary: 'Retrieve Event Type by log Id',
    schema: EventTicketTypeSchema,
    group: group,
    params: EventTicketTypeSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.EVENTS, PERMISSION.READ),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Event Type',
    summary: 'Add a Event Type',
    schema: EventTicketTypeSchema,
    group: group,
    body: EventTicketTypeSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.EVENTS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Update a Event Type by Id',
    summary: 'Update Event Type by log Id',
    schema: EventTicketTypeSchema,
    group: group,
    body: EventTicketTypeSchema.omit({ Id: true }),
    params: EventTicketTypeSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.EVENTS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Delete a Event Type by Id',
    summary: 'Delete Event Type by log Id',
    schema: EventTicketTypeSchema,
    group: group,
    params: EventTicketTypeSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.EVENTS,
        PERMISSION.DELETE,
      ),
  },
  {
    method: 'get',
    path: '/type/{Id}',
    description: 'Get Event Type by Column Value',
    summary: 'Retrieve Event Type by Column Value',
    schema: EventTicketTypeSchema,
    group: group,
    params: EventTicketTypeSchema.pick({ Id: true }),
    handler: routes.get,
  },
]);

export default {
  route: app,
  path: '/eventtickettype',
};
