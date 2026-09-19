import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { EventReceiptSchema, EventReceipts, eventReceiptsModel } from './model';

const routes = baseRoute<EventReceipts>(eventReceiptsModel);
const group = 'EventReceipts';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Event Receipts',
    summary: 'Retrieve all Event Receipts',
    schema: EventReceiptSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Event Receipts by Id',
    summary: 'Retrive Event Receipts by log Id',
    schema: EventReceiptSchema,
    group: group,
    params: EventReceiptSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.EVENTS, PERMISSION.READ),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Event Receipts',
    summary: 'Add a Event Receipts',
    schema: EventReceiptSchema,
    group: group,
    body: EventReceiptSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.EVENTS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Event Receipts by Id',
    summary: 'Retrive Event Receipts by log Id',
    schema: EventReceiptSchema,
    group: group,
    body: EventReceiptSchema.omit({ Id: true }),
    params: EventReceiptSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.EVENTS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Event Receipts by Id',
    summary: 'Retrive Event Receipts by log Id',
    schema: EventReceiptSchema,
    group: group,
    params: EventReceiptSchema.pick({ Id: true }),
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
  path: '/eventreceipts',
};
