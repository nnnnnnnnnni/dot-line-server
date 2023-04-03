import { Context } from "koa";
import { IRoutes } from ".";
import { signToAuth } from "../middlewares";

export const userV1Routes: IRoutes = {
  prefix: '/v1',
  routes: [
    {
      path: 'users',
      method: 'get',
      handler: async (ctx: Context) => {
        const token = signToAuth({ id: 1, name: 'test' })
        ctx.body = token;
      },
    },
    {
      path: 'users',
      method: 'post',
      handler: async (ctx: Context) => {
        ctx.body = 'Hello post';
      },
      needLogin: true,
    },
    {
      path: 'users',
      method: 'put',
      handler: async (ctx: Context) => {
        ctx.body = 'Hello put';
      },
    },
    {
      path: 'users',
      method: 'delete',
      handler: async (ctx: Context) => {
        ctx.body = 'Hello delete';
      },
    }
  ]
}