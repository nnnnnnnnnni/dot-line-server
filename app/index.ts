import Koa, { Context } from 'koa';
import koaStatic from 'koa-static';
import dotEnv from 'dotenv';
import path from 'path';
import { initMoongoDB, initRedis } from './database';
import { initRoutes } from './router';
dotEnv.config();
const pino = require('koa-pino-logger')()

const app = new Koa<any, Context>();

// static files
app.use(koaStatic(path.resolve(__dirname, '../public')))

// logger
app.use(pino)

// database
initMoongoDB();
initRedis().then(instance => {
  app.context.redis = instance;
})

// router
const router = initRoutes();
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = 'Hello World111';
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`)
})