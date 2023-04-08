import { IMiddleware } from 'koa-router';
import joi from 'joi'

export * from './init';


export interface IRoute {
  path: string;
  method: string;
  validation?: joi.Schema;
  handler: IMiddleware<any, any>;
  needLogin?: boolean;
}

export interface IRoutes {
  prefix?: string;
  routes: IRoute[];
}