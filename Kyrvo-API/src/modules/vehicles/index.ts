import { adminFeature, requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Vehicle, VehicleSchema, vehicleModel } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';

const routes = baseRoute<Vehicle>(vehicleModel);
const group = 'Vehicles';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all vehicles',
    summary: 'Retrieve all vehicles',
    schema: VehicleSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a vehicle by Id',
    summary: 'Retrive vehicle by log Id',
    schema: VehicleSchema,
    group: group,
    params: VehicleSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a vehicle',
    summary: 'Add a vehicle',
    schema: VehicleSchema,
    group: group,
    body: VehicleSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.VEHICLES, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a vehicle by Id',
    summary: 'Retrive vehicle by log Id',
    schema: VehicleSchema,
    group: group,
    body: VehicleSchema,
    params: VehicleSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.VEHICLES, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a vehicle by Id',
    summary: 'Retrive vehicle by log Id',
    schema: VehicleSchema,
    group: group,
    params: VehicleSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
]);

export default {
  route: app,
  path: '/vehicles',
};
