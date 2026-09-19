import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { Blogtag, BlogtagSchema, blogtagModel } from './model';

const routes = baseRoute<Blogtag>(blogtagModel);
const group = 'BlogTag';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all blg tags',
    summary: 'Retrieve all blg tags',
    schema: BlogtagSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a blg tag by Id',
    summary: 'Retrive a blg tag by Id',
    schema: BlogtagSchema,
    group: group,
    params: BlogtagSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a blog tag',
    summary: 'Add a post',
    schema: BlogtagSchema,
    group: group,
    body: BlogtagSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.BLOG, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a blog tag by Id',
    summary: 'Retrive blog tag by log Id',
    schema: BlogtagSchema,
    group: group,
    body: BlogtagSchema.omit({ Id: true }),
    params: BlogtagSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.BLOG, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a blog tag by Id',
    summary: 'Retrive blog tag by log Id',
    schema: BlogtagSchema,
    group: group,
    params: BlogtagSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.delete, FEATURES.BLOG, PERMISSION.DELETE),
  },
]);

export default {
  route: app,
  path: '/blogtag',
};
