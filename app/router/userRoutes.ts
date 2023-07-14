import { helloWorld } from "@controller/user/helloWorld";
import { IRoutes } from ".";
import Joi from 'joi';

export const userV1Routes: IRoutes = {
  prefix: '/v1',
  routes: [
    {
      path: 'hello',
      method: 'get',
      validation: Joi.object(),
      needLogin: false,
      handler: helloWorld
    },
  ]
}