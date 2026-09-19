import { adminFeature } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Role, RoleSchema, roleModel } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';

const routes = baseRoute<Role>(roleModel);
const group = 'Roles';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all roles',
    summary: 'Retrieve all roles',
    schema: RoleSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a role by Id',
    summary: 'Retrive role by log Id',
    schema: RoleSchema,
    group: group,
    params: RoleSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a role',
    summary: 'Add a role',
    schema: RoleSchema,
    group: group,
    body: RoleSchema.omit({ Id: true }),
    handler: (c) => adminFeature(c, routes.post),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a role by Id',
    summary: 'Retrive role by log Id',
    schema: RoleSchema,
    group: group,
    body: RoleSchema,
    params: RoleSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.put),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a role by Id',
    summary: 'Retrive role by log Id',
    schema: RoleSchema,
    group: group,
    params: RoleSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
]);

export default {
  route: app,
  path: '/roles',
};
