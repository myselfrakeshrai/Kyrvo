import { adminFeature } from 'utils/permission';
import baseRoute from 'shared/baseRoute';
import { Permission, permissionModel, PermissionSchema } from './model';
import { generateRoutes } from 'helpers/openaApiRoute';

const routes = baseRoute<Permission>(permissionModel);

const group = 'Permissions';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all permissions',
    summary: 'Retrieve all permissions',
    schema: PermissionSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a permission by Id',
    summary: 'Retrive permission by log Id',
    schema: PermissionSchema,
    group: group,
    params: PermissionSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a permission',
    summary: 'Add a permission',
    schema: PermissionSchema,
    group: group,
    body: PermissionSchema.omit({ Id: true }),
    handler: (c) => adminFeature(c, routes.post),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a permission by Id',
    summary: 'Retrive permission by log Id',
    schema: PermissionSchema,
    group: group,
    body: PermissionSchema.pick({
      RoleId: true,
      FeatureId: true,
      PermissionLevel: true,
    }),
    params: PermissionSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.put),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a permission by Id',
    summary: 'Retrive permission by log Id',
    schema: PermissionSchema,
    group: group,
    params: PermissionSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
]);
export default {
  route: app,
  path: '/permissions',
};
