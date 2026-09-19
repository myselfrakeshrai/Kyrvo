import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { ContactUs, ContactUsSchema, contactUsModel } from './model';

const routes = baseRoute<ContactUs>(contactUsModel);
const group = 'ContactUs';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Contacts',
    summary: 'Retrieve all Contacts',
    schema: ContactUsSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Contact by Id',
    summary: 'Retrive a Contact by Id',
    schema: ContactUsSchema,
    group: group,
    params: ContactUsSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Contact',
    summary: 'Add a Contact',
    schema: ContactUsSchema,
    group: group,
    body: ContactUsSchema.omit({ Id: true }),
    handler: routes.post,
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a Contact by Id',
    summary: 'Retrive Contact by log Id',
    schema: ContactUsSchema,
    group: group,
    body: ContactUsSchema.omit({ Id: true }),
    params: ContactUsSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.CONTACTUS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Contact by Id',
    summary: 'Retrive Contact by log Id',
    schema: ContactUsSchema,
    group: group,
    params: ContactUsSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.CONTACTUS,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/contact',
};
