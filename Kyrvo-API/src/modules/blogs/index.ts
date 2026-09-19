import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Blogpost, BlogpostSchema, blogpostModel } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';

const routes = baseRoute<Blogpost>(blogpostModel);
const group = 'Blog';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all posts',
    summary: 'Retrieve all posts',
    schema: BlogpostSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a post by Id',
    summary: 'Retrive a post by Id',
    schema: BlogpostSchema,
    group: group,
    params: BlogpostSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a post',
    summary: 'Add a post',
    schema: BlogpostSchema,
    group: group,
    body: BlogpostSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.BLOG, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a blog by Id',
    summary: 'Retrive blog by log Id',
    schema: BlogpostSchema,
    group: group,
    body: BlogpostSchema.omit({ Id: true }),
    params: BlogpostSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.BLOG, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a blog by Id',
    summary: 'Retrive blog by log Id',
    schema: BlogpostSchema,
    group: group,
    params: BlogpostSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.delete, FEATURES.BLOG, PERMISSION.DELETE),
  },
]);

export default {
  route: app,
  path: '/blog',
};
