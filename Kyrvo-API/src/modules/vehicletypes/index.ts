import { vehicleTypeModel, VehicleType, VehicleTypeSchema } from './model';
import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
const routes = baseRoute<VehicleType>(vehicleTypeModel);
const group = 'Vehicles';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all vehicle types',
    summary: 'Retrieve all vehicle types',
    schema: VehicleTypeSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a vehicle type by Id',
    summary: 'Retrive vehicle type by log Id',
    schema: VehicleTypeSchema,
    group: group,
    params: VehicleTypeSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a vehicle types',
    summary: 'Add a vehicle types',
    schema: VehicleTypeSchema,
    group: group,
    body: VehicleTypeSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.post,
        FEATURES.VEHICLETYPES,
        PERMISSION.WRITE,
      ),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a vehicle types by Id',
    summary: 'Retrive vehicle types by log Id',
    schema: VehicleTypeSchema,
    group: group,
    body: VehicleTypeSchema,
    params: VehicleTypeSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.put,
        FEATURES.VEHICLETYPES,
        PERMISSION.UPDATE,
      ),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a vehicle types by Id',
    summary: 'Retrive vehicle types by log Id',
    schema: VehicleTypeSchema,
    group: group,
    params: VehicleTypeSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.VEHICLETYPES,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: 'vehicletype',
};
