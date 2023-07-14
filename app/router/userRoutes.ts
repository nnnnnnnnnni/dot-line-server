import { helloWorld } from "@controller/user/helloWorld";
import { Context } from "koa";
import { IRoutes } from ".";
import Joi from 'joi';

export const userV1Routes: IRoutes = {
  prefix: '/v1',
  routes: [
    {
      path: 'hello',
      method: 'get',
      validation: Joi.object(),
      handler: helloWorld
    },
  ]
}