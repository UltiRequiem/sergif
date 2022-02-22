import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import serverless from 'serverless-http';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const app = fastify();

const development = process.env.ENV === 'dev';

const buildPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '/..',
  '/../',
  development ? 'frontend/' : '',
  'dist',
);

app.register(fastifyStatic, {
  root: buildPath,
  prefix: '/',
});

export default app;

export const handler = serverless(app);
