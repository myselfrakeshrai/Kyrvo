import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { Pricing, pricingModel, PricingSchema } from './model';
import { generateResponse } from 'shared/helpers/responseHelper';
import { NO_RECORDS_FOUND } from 'shared/utils/messages';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
const routes = baseRoute<Pricing>(pricingModel);
const group = 'pricings';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Pricings',
    summary: 'Retrieve all Pricings',
    schema: PricingSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/current',
    description: 'Get all Pricings',
    summary: 'Retrieve all Pricings',
    schema: PricingSchema,
    group: group,
    handler: async (c: any) => {
      const data = await pricingModel.getApplicable(c.env.ae_d1);
      return generateResponse(c, data, 404, NO_RECORDS_FOUND);
    },
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a pricing by Id',
    summary: 'Retrive pricing by log Id',
    schema: PricingSchema,
    group: group,
    params: PricingSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'get',
    path: '/code/{Code}',
    description: 'Get a pricing by Id',
    summary: 'Retrive pricing by log Id',
    schema: PricingSchema,
    group: group,
    params: PricingSchema.pick({ Code: true }),
    handler: async (c: any) => {
      const { code } = await c.req.param();
      const data = await pricingModel.getValidPromo(
        c.env.ae_d1,
        code?.toUpperCase(),
      );
      return generateResponse(c, data, 404, NO_RECORDS_FOUND);
    },
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a pricing',
    summary: 'Add a pricing',
    schema: PricingSchema,
    group: group,
    body: PricingSchema.omit({ Id: true, IsActive: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.PRICING, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a pricing by Id',
    summary: 'Retrive pricing by log Id',
    schema: PricingSchema,
    group: group,
    body: PricingSchema,
    params: PricingSchema.pick({ Id: true, IsActive: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.PRICING, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a pricing by Id',
    summary: 'Retrive pricing by log Id',
    schema: PricingSchema,
    group: group,
    params: PricingSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.delete, FEATURES.PRICING, PERMISSION.DELETE),
  },
]);
export default {
  route: app,
  path: '/pricings',
};
