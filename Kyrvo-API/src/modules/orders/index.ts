import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import {  OrderSchema, Orders, orderModel } from './model';
import { getRequestUserId } from 'utils/jwt';

const routes = baseRoute<Orders>(orderModel);
const group = 'Orders';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Orders',
    summary: 'Retrieve all Orders',
    schema: OrderSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Order by Id',
    summary: 'Retrive Order by log Id',
    schema: OrderSchema,
    group: group,
    params: OrderSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.ORDERS, PERMISSION.READ),
  },
  {
    method: 'get',
    path: '/currentUser',
    description: 'Get a Order by Id',
    summary: 'Retrive Order by log Id',
    schema: OrderSchema,
    group: group,
    params: OrderSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        (c: any) => {
          const userId = getRequestUserId(c);
          return routes.getWithFilters(
            c,
            ['CustomerId', 'Status'],
            [userId, 1],
          );
        },
        FEATURES.ORDERS,
        PERMISSION.READ,
      ),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Order',
    summary: 'Add a Order',
    schema: OrderSchema,
    group: group,
    body: OrderSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.ORDERS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Order by Id',
    summary: 'Retrive Order by log Id',
    schema: OrderSchema,
    group: group,
    body: OrderSchema.omit({ Id: true }),
    params: OrderSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.ORDERS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Order by Id',
    summary: 'Retrive Order by log Id',
    schema: OrderSchema,
    group: group,
    params: OrderSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.delete, FEATURES.ORDERS, PERMISSION.DELETE),
  },
]);

export default {
  route: app,
  path: '/orders',
};
