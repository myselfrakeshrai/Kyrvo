import { adminFeature } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Agent, AgentSchema, agentModel } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';

const routes = baseRoute<Agent>(agentModel);
const group = 'Agents';

const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Agents',
    summary: 'Retrieve all Agents',
    schema: AgentSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Agent by Id',
    summary: 'Retrive Agent by log Id',
    schema: AgentSchema,
    group: group,
    params: AgentSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Agent',
    summary: 'Add a Agent',
    schema: AgentSchema,
    group: group,
    body: AgentSchema.omit({ Id: true }),
    handler: (c) => adminFeature(c, routes.post),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Agent by Id',
    summary: 'Retrive Agent by log Id',
    schema: AgentSchema,
    group: group,
    body: AgentSchema.omit({ Id: true }),
    params: AgentSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.put),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Agent by Id',
    summary: 'Retrive Agent by log Id',
    schema: AgentSchema,
    group: group,
    params: AgentSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
]);
export default {
  route: app,
  path: '/agents',
};
