import { Context } from "koa";
import { IRouterOptions } from "koa-router";
import { IRoute } from ".";
import { signToAuth } from "../middlewares";

export const userRoutes: IRoute[] = [
  {
    path: '/users',
    method: 'get',
    handler: async (ctx: Context) => {
      const token = signToAuth({ id: 1, name: 'test' })
      ctx.body = token;
    },
  },
  {
    path: '/users',
    method: 'post',
    handler: async (ctx: Context) => {
      ctx.body = 'Hello post';
    },
    needLogin: true,
  },
  {
    path: '/users',
    method: 'put',
    handler: async (ctx: Context) => {
      ctx.body = 'Hello put';
    },
  },
  {
    path: '/users',
    method: 'delete',
    handler: async (ctx: Context) => {
      ctx.body = 'Hello delete';
    },
  }
]