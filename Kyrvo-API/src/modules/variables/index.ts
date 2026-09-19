import { adminFeature } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Variable, VariableSchema, variableModel } from './model';
import { z } from '@hono/zod-openapi';
import { generateRoutes } from 'shared/helpers/openaApiRoute';

const routes = baseRoute<Variable>(variableModel);
const group = 'Variables';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all variables',
    summary: 'Retrieve all variables',
    schema: VariableSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a variable by Id',
    summary: 'Retrive variable by log Id',
    schema: VariableSchema,
    group: group,
    params: VariableSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a variable',
    summary: 'Add a variable',
    schema: VariableSchema,
    group: group,
    body: VariableSchema,
    handler: (c) => adminFeature(c, routes.post),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a variable by Id',
    summary: 'Retrive variable by log Id',
    schema: VariableSchema,
    group: group,
    body: VariableSchema,
    params: VariableSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.put),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a variable by Id',
    summary: 'Retrive variable by log Id',
    schema: VariableSchema,
    group: group,
    params: VariableSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
  {
    method: 'get',
    path: '/{col}/{val}',
    description: 'Get a variable by property',
    summary: 'Retrive variable by variable by property',
    schema: VariableSchema,
    params: z.object({
      col: z.string(),
      val: z.string(),
    }),
    group: group,
    handler: routes.getBy,
  },
]);

export default {
  route: app,
  path: '/variables',
};
