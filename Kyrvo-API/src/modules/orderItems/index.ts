import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { OrderItem, OrderItemSchema, orderItemModel } from './model';

const routes = baseRoute<OrderItem>(orderItemModel);
const group = 'OrderItems';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all OrderItems',
    summary: 'Retrieve all OrderItems',
    schema: OrderItemSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Order by Id',
    summary: 'Retrive Order by log Id',
    schema: OrderItemSchema,
    group: group,
    params: OrderItemSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.ORDERS, PERMISSION.READ),
  },

  {
    method: 'post',
    path: '/',
    description: 'Create a Order',
    summary: 'Add a Order',
    schema: OrderItemSchema,
    group: group,
    body: OrderItemSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.ORDERS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Order by Id',
    summary: 'Retrive Order by log Id',
    schema: OrderItemSchema,
    group: group,
    body: OrderItemSchema.omit({ Id: true }),
    params: OrderItemSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.ORDERS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Order by Id',
    summary: 'Retrive Order by log Id',
    schema: OrderItemSchema,
    group: group,
    params: OrderItemSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.delete, FEATURES.ORDERS, PERMISSION.DELETE),
  },
]);

export default {
  route: app,
  path: '/orderitem',
};
