import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Agency, AgencySchema, agencyModel } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';

const routes = baseRoute<Agency>(agencyModel);
const group = 'Agencies';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Agencies',
    summary: 'Retrieve all Agencies',
    schema: AgencySchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Agency by Id',
    summary: 'Retrive Agency by log Id',
    schema: AgencySchema,
    group: group,
    params: AgencySchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.AGENCIES, PERMISSION.READ),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Agency',
    summary: 'Add a Agency',
    schema: AgencySchema,
    group: group,
    body: AgencySchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.AGENCIES, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Agency by Id',
    summary: 'Retrive Agency by log Id',
    schema: AgencySchema,
    group: group,
    body: AgencySchema.omit({ Id: true }),
    params: AgencySchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.AGENCIES, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Agency by Id',
    summary: 'Retrive Agency by log Id',
    schema: AgencySchema,
    group: group,
    params: AgencySchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.AGENCIES,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/agencies',
};
