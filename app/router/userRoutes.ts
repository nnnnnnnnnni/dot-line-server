import { login } from "@controller/user/login";
import { Context } from "koa";
import { IRoutes } from ".";
import Joi from 'joi';

export const userV1Routes: IRoutes = {
  prefix: '/v1',
  routes: [
    {
      path: 'users',
      method: 'get',
      validation: Joi.object({
        name: Joi.number().required()
      }),
      handler: login
    },
    {
      path: 'users',
      method: 'post',
      needLogin: true,
      handler: async (ctx: Context) => {
        ctx.body = 'Hello post';
      },
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