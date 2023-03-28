import { Context } from "koa";
import { IRouterOptions } from "koa-router";
import { IRoute } from ".";

export const userRoutes: IRoute[] = [
  {
    path: '/users',
    method: 'get',
    handler: async (ctx: Context) => {
      ctx.body = 'Hello get';
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