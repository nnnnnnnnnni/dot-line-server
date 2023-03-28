import { Middleware } from "koa";

export const auth: Middleware = (ctx, next) => {
  ctx.response.status = 401
  return ctx.body='Hello World';
  next();
}