import { requiredPermission } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { FEATURES, PERMISSION } from 'shared/const';
import { NewsLetter, NewsLetterSchema, newsLetterModel } from './model';

const routes = baseRoute<NewsLetter>(newsLetterModel);
const group = 'NewsLetters';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all NewsLetters',
    summary: 'Retrieve all NewsLetters',
    schema: NewsLetterSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a NewsLetter by Id',
    summary: 'Retrive NewsLetter by log Id',
    schema: NewsLetterSchema,
    group: group,
    params: NewsLetterSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.get, FEATURES.NEWSLETTERS, PERMISSION.READ),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a NewsLetter',
    summary: 'Add a NewsLetter',
    schema: NewsLetterSchema,
    group: group,
    body: NewsLetterSchema.omit({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.post, FEATURES.NEWSLETTERS, PERMISSION.WRITE),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a NewsLetter by Id',
    summary: 'Retrive NewsLetter by log Id',
    schema: NewsLetterSchema,
    group: group,
    body: NewsLetterSchema.omit({ Id: true }),
    params: NewsLetterSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(c, routes.put, FEATURES.NEWSLETTERS, PERMISSION.UPDATE),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a NewsLetter by Id',
    summary: 'Retrive NewsLetter by log Id',
    schema: NewsLetterSchema,
    group: group,
    params: NewsLetterSchema.pick({ Id: true }),
    handler: (c) =>
      requiredPermission(
        c,
        routes.delete,
        FEATURES.NEWSLETTERS,
        PERMISSION.DELETE,
      ),
  },
]);

export default {
  route: app,
  path: '/newsletter',
};
