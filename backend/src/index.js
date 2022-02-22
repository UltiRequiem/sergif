const fastify = require('fastify');
const fastifyStatic = require('fastify-static');

const serverless = require('serverless-http');

const { join } = require('path');

const app = fastify();

const development = process.env.ENV === 'dev';

const buildPath = join(
  __dirname,
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
