import { adminFeature } from 'shared/utils/permission';
import { feedBackModel, FeedBackSchema, FeedBack } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import baseRoute from 'shared/baseRoute';

const routes = baseRoute<FeedBack>(feedBackModel);
const group = 'Feebacks';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Feedbacks',
    summary: 'Retrieve all Feedbacks',
    schema: FeedBackSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Feedback by Id',
    summary: 'Retrive Feedback by log Id',
    schema: FeedBackSchema,
    group: group,
    params: FeedBackSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Feedback',
    summary: 'Add a Feedback',
    schema: FeedBackSchema,
    group: group,
    body: FeedBackSchema.omit({ Id: true }),
    handler: (c) => adminFeature(c, routes.post),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Feedback by Id',
    summary: 'Retrive Feedback by log Id',
    schema: FeedBackSchema,
    group: group,
    body: FeedBackSchema.omit({ Id: true }),
    params: FeedBackSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.put),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Feedback by Id',
    summary: 'Retrive Feedback by log Id',
    schema: FeedBackSchema,
    group: group,
    params: FeedBackSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
]);

export default {
  route: app,
  path: '/feedback',
};
