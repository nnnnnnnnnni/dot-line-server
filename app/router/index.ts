import { Context } from 'koa';
import { IMiddleware } from 'koa-router';

export * from './init';

export interface IRoute {
  path: string | RegExp;
  method: string;
  handler: IMiddleware<any, any>,
  needLogin?: boolean;
}