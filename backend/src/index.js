import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import serverless from 'serverless-http';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const app = fastify();

app.register(fastifyStatic, {
  root: join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist'),
  prefix: '/',
});

export default app;

export const handler = serverless(app);
