import baseRoute from 'shared/baseRoute';
import { Log, LogSchema, logModel } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
const group = 'Logs';
const routes = baseRoute<Log>(logModel);
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all variables',
    summary: 'Retrieve all variables',
    schema: LogSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a log by Id',
    summary: 'Retrive log by log Id',
    schema: LogSchema,
    group: group,
    params: LogSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'get',
    path: '/{col}/{val}',
    description: 'Get a log by property',
    summary: 'Retrive log by log by property',
    schema: LogSchema,
    group: group,
    body: LogSchema,
    handler: routes.getBy,
  },
]);

export default {
  route: app,
  path: '/logs'
};
