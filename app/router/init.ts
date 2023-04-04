import { Context } from 'koa';
import Router from 'koa-router';
import { compact, flatten } from 'lodash';
import { IRoute } from '.';
import { authMiddleware } from '../middlewares';
import { errorHandle } from '../middlewares/errorHandle';
import { userV1Routes } from './userRoutes';

export const initRoutes = () => {
  const koaRouter = new Router();

  const routes = compact([userV1Routes]);

  const routesWithPrefix = flatten(routes.map(routeMap => {
    const routes: IRoute[] = [];

    const prefix = routeMap.prefix ? `${routeMap.prefix.startsWith('/') ? '' : '/'}${routeMap.prefix}` : '';

    routeMap.routes.map(route => {
      const path = route.path?.startsWith('/') ? route.path : `/${route.path}`;
      routes.push({
        ...route,
        path: routeMap.prefix ? `${prefix}${path}` : path
      } as IRoute)
    })

    return routes;
  }))

  const routesWithPrefixAndMethod = [...routesWithPrefix, {
    path: new RegExp('/.*') as any as string,
    method: 'get',
    handler: async (ctx: Context) => {
      return ctx.body = '404';
    },
  } as IRoute]

  routesWithPrefixAndMethod.map(route => {
    const middlewares = compact([
      route.needLogin ? authMiddleware : null,
      route.handler
    ]);
    if (route.method === 'get') {
      koaRouter.get(route.path, ...middlewares);
    } else if (route.method === 'post') {
      koaRouter.post(route.path, ...middlewares);
    } else if (route.method === 'put') {
      koaRouter.put(route.path, ...middlewares);
    } else if (route.method === 'delete') {
      koaRouter.delete(route.path, ...middlewares);
    } else {
      koaRouter.all(route.path, ...middlewares);
    }
  })

  return koaRouter;
}