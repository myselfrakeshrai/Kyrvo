import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { Context } from '../Context';

export type openApiRoute = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  description: string;
  summary: string;
  schema: z.AnyZodObject;
  group: string;
  handler: (c: any) => Promise<any>;
  params?: z.AnyZodObject;
  body?: z.AnyZodObject;
  uploadImage?: boolean;
};

export const generateRoutes = (routes: openApiRoute[]) => {
  const app = new OpenAPIHono<Context>();
  for (const route of routes) {
    if (route.uploadImage) {
      app.openapi(
        createRoute({
          method: route.method,
          path: route.path,
          tags: [route.group],
          request: {
            params: route.params,
          },
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: route.schema,
                },
              },
              description: route.description,
            },
          },
        }),
        route.handler,
      );
    } else {
      app.openapi(
        createRoute({
          method: route.method,
          path: route.path,
          tags: [route.group],
          request: {
            params: route.params,
            body: route.body
              ? {
                  content: {
                    'application/json': { schema: route.body || {} },
                  },
                }
              : undefined,
          },
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: route.schema,
                },
              },
              description: route.description,
            },
          },
        }),
        route.handler,
      );
    }
  }
  return app;
};
