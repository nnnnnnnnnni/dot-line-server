import Koa, { Context } from 'koa';
import koaStatic from 'koa-static';
import dotEnv from 'dotenv';
import path from 'path';
import { initMoongoDB, initRedis } from './database';
const pino = require('koa-pino-logger')()
import { initRoutes } from './router';
dotEnv.config({
  path: path.resolve(__dirname, '../.env')
});

const app = new Koa<any, Context>();

// static files
app.use(koaStatic(path.resolve(__dirname, '../public')))

// logger
// app.use(pino)

// database
initMoongoDB();
initRedis().then(instance => {
  if (instance)
    app.context.redis = instance;
})

// router
const router = initRoutes();
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`)
})