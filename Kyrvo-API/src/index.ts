import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import appRoutes from './modules';
import { Context } from 'shared/Context';
import { logger } from 'hono/logger';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { adminFeature } from 'utils/permission';
import { ENV } from 'shared/const';
import { serveStatic } from 'hono/cloudflare-workers';
import { CORS } from './cors';

//const app = new Hono<Context>();

const app = new OpenAPIHono<Context>();
app.use('*', logger());
app.use('*', async (c, next) => {
  const origin = c.env.ENV === ENV.PROD ? CORS : ['http://localhost:5173'];
  const corsMiddleware = cors({
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    origin: origin,
    maxAge: 600,
    credentials: true,
  });
  return await corsMiddleware(c, next);
});
app.use('/*', prettyJSON());
app.route('/', appRoutes);

app.use('/static/*', serveStatic({ root: './' }));
app.get(
  '/docs',
  adminFeature,
  swaggerUI({
    url: '/doc',
    docExpansion: 'none',
  }),
);

app.doc('/doc', {
  info: {
    title: 'Harbour Hire API',
    version: 'v1',
    description: 'API Reference for Harbour Hire API.',
    contact: {
      name: 'Kaha Inc',
      email: 'info@kaha.co',
      url: 'https://kaha.co',
    },
  },
  openapi: '3.1.0',
});
export default app;
