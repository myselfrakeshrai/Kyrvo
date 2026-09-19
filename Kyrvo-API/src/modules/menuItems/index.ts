import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { MenuItem, MenuItemSchema, menuItemModel } from './model';

const routes = baseRoute<MenuItem>(menuItemModel);
const group = 'MenuItems';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all MenuItems',
    summary: 'Retrieve all MenuItems',
    schema: MenuItemSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a MenuItem by Id',
    summary: 'Retrive MenuItem by log Id',
    schema: MenuItemSchema,
    group: group,
    params: MenuItemSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.MENUITEMS, PERMISSION.READ),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a MenuItem',
    summary: 'Add a MenuItem',
    schema: MenuItemSchema,
    group: group,
    body: MenuItemSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.MENUITEMS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a MenuItem by Id',
    summary: 'Retrive MenuItem by log Id',
    schema: MenuItemSchema,
    group: group,
    body: MenuItemSchema.omit({ Id: true }),
    params: MenuItemSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.MENUITEMS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a MenuItem by Id',
    summary: 'Retrive MenuItem by log Id',
    schema: MenuItemSchema,
    group: group,
    params: MenuItemSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.MENUITEMS,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/menuitem',
};
