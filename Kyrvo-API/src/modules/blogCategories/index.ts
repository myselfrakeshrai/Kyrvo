import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { BlogCategory, BlogcategorySchema, blogcategoryModel } from './model';

const routes = baseRoute<BlogCategory>(blogcategoryModel);
const group = 'Blogcategory';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Categories',
    summary: 'Retrieve all Categories',
    schema: BlogcategorySchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Category by Id',
    summary: 'Retrive a Category by Id',
    schema: BlogcategorySchema,
    group: group,
    params: BlogcategorySchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Category',
    summary: 'Add a Category',
    schema: BlogcategorySchema,
    group: group,
    body: BlogcategorySchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.BLOG, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Category by Id',
    summary: 'Retrive Category by log Id',
    schema: BlogcategorySchema,
    group: group,
    body: BlogcategorySchema.omit({ Id: true }),
    params: BlogcategorySchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.BLOG, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Category by Id',
    summary: 'Retrive Category by log Id',
    schema: BlogcategorySchema,
    group: group,
    params: BlogcategorySchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.delete, FEATURES.BLOG, PERMISSION.DELETE),
  },
]);

export default {
  route: app,
  path: '/blogcategory',
};
