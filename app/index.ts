import Koa, { Context } from 'koa';
import koaStatic from 'koa-static';
import dotEnv from 'dotenv';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import { initRoutes } from './router';
import { errorHandle } from './middlewares/errorHandle';
import { Redis } from 'ioredis';
import { initMoongoDB, initRedis } from '@db/init';
dotEnv.config({ path: path.resolve(__dirname, '../.env') });

let redisClient: Redis | undefined;

const app = new Koa<any, Context>();

// 静态文件
app.use(koaStatic(path.resolve(__dirname, '../public')))

// error handle
app.use(errorHandle);

// logger
// app.use(require('koa-pino-logger')())

// database
initMoongoDB();
initRedis().then(instance => {
  if (instance) {
    app.context.redis = instance;
    redisClient = instance
  }
})

app.use(bodyParser({enableTypes: ['json', 'form', 'text']}))

// router
const router = initRoutes();
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`)
})

export { redisClient, app };