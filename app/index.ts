import Koa, { Context } from 'koa';
import koaStatic from 'koa-static';
import dotEnv from 'dotenv';
import path from 'path';
import { initMoongoDB, initRedis } from './database';
dotEnv.config();
const pino = require('koa-pino-logger')()

const app = new Koa<any, Context>();

// 静态资源
app.use(koaStatic(path.resolve(__dirname, '../public')))

app.use(pino)

initMoongoDB();
initRedis().then(instance => {
  app.context.redis = instance;
})

app.use(async (ctx) => {
  ctx.body = 'Hello World111';
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})