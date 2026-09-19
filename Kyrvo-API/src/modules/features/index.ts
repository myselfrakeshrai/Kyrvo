import { adminFeature } from '../shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Feature, FeatureSchema, featureModel } from './model';
import { generateRoutes } from '../shared/helpers/openaApiRoute';

const routes = baseRoute<Feature>(featureModel);
const group = 'Features';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Features',
    summary: 'Retrieve all Features',
    schema: FeatureSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Feature by Id',
    summary: 'Retrive Feature by log Id',
    schema: FeatureSchema,
    group: group,
    params: FeatureSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Feature',
    summary: 'Add a Feature',
    schema: FeatureSchema,
    group: group,
    body: FeatureSchema,
    handler: (c) => adminFeature(c, routes.post),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Feature by Id',
    summary: 'Retrive Feature by log Id',
    schema: FeatureSchema,
    group: group,
    body: FeatureSchema,
    params: FeatureSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.put),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Feature by Id',
    summary: 'Retrive Feature by log Id',
    schema: FeatureSchema,
    group: group,
    params: FeatureSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
]);

export default {
  route: app,
  path: '/features',
};