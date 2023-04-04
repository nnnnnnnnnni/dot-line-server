import { Context } from "koa";
import { IRoutes } from ".";
import { login } from "../controller/user/login";
import { userModel } from "../database/schema/user";
import { signToAuth } from "../middlewares";

export const userV1Routes: IRoutes = {
  prefix: '/v1',
  routes: [
    {
      path: 'users',
      method: 'get',
      handler: login
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