import { generateResponse } from 'shared/helpers/responseHelper';
import { COULDNT_ADD_DATA } from 'shared/utils/messages';
import baseRoute from 'shared/baseRoute';
import { Media, mediaModel, MediaSchema } from './model';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
import { adminFeature } from 'shared/utils/permission';

const routes = baseRoute(mediaModel);
const group = 'Media';

const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Medias',
    summary: 'Retrieve all Medias',
    schema: MediaSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a Media by Id',
    summary: 'Retrive Media by log Id',
    schema: MediaSchema,
    group: group,
    params: MediaSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'get',
    path: '/asset/{Id}',
    description: 'Get media file from R2',
    summary: 'Retrive Media fiel from R2 by Id',
    schema: MediaSchema,
    group: group,
    params: MediaSchema.pick({ Id: true }),
    handler: async (c: any) => {
      const { Id } = c.req.param();
      try {
        const object = await c.env.ae_r2.get(Id);
        console.log(object);
        if (!object) {
          return new Response('Object not found', { status: 404 });
        }

        const headers = new Headers();
        headers.set('content-type', object.httpMetadata?.contentType || '');
        return new Response(object.body, { headers });
      } catch (error) {
        return new Response('Error retrieving file', { status: 500 });
      }
    },
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a Media',
    summary: 'Add a Media',
    schema: MediaSchema,
    group: group,
    uploadImage: true,
    handler: (c) =>
      adminFeature(c, async (c: any) => {
        const body = await c.req.parseBody();
        const param = JSON.parse(body['document'] as string) as Media;
        const file = body['file'] as File;
        if (!file || !c.env.ae_r2) {
          return c.json({ message: 'No file or R2 bucket found' }, 400);
        }

        try {
          // Assuming `file` is a File object or similar
          const uuid = crypto.randomUUID();
          await c.env.ae_r2.put(uuid, file.stream());
          param.Id = uuid;
          const media = await mediaModel.create(c.env.ae_d1, param, uuid);
          return generateResponse(c, media, 422, COULDNT_ADD_DATA);
        } catch (error) {
          return generateResponse(c, undefined, 422, 'Error uploading file.');
        }
      }),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Delete a Media by Id',
    summary: 'Remove Media by Id',
    schema: MediaSchema,
    group: group,
    params: MediaSchema.pick({ Id: true }),
    handler: (c) =>
      adminFeature(c, async (c: any) => {
        const { Id } = c.req.valid('param');
        const media = await mediaModel.deleteById(c.env.ae_d1, Id);
        if (media) {
          await c.env.ae_r2.delete(Id);
        }
        return generateResponse(c, media, 422, "Couldn't delete you file.");
      }),
  },
]);

export default {
  route: app,
  path: '/media',
};
