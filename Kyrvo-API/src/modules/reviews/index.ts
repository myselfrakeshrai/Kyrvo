import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { Review, ReviewSchema, reviewModel } from './model';

const routes = baseRoute<Review>(reviewModel);
const group = 'Reviews';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Reviews',
    summary: 'Retrieve all Reviews',
    schema: ReviewSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Review by Id',
    summary: 'Retrive Review by log Id',
    schema: ReviewSchema,
    group: group,
    params: ReviewSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.Orders, PERMISSION.READ),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Review',
    summary: 'Add a Review',
    schema: ReviewSchema,
    group: group,
    body: ReviewSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.Orders, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Review by Id',
    summary: 'Retrive Review by log Id',
    schema: ReviewSchema,
    group: group,
    body: ReviewSchema.omit({ Id: true }),
    params: ReviewSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.Orders, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Review by Id',
    summary: 'Retrive Review by log Id',
    schema: ReviewSchema,
    group: group,
    params: ReviewSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.Orders,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/review',
};
