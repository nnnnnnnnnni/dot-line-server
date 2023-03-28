import Router from 'koa-router';
import { compact } from 'lodash';
import { auth } from '../middlewares';
import { userRoutes } from './userRoutes';

export const initRoutes = () => {
  const koaRouter = new Router();

  const routes = compact([...userRoutes]);

  routes.map(route => {
    const middlewares = compact([
      route.needLogin ? auth : null,
      route.handler
    ]);
    if(route.method === 'get') {
      koaRouter.get(route.path, ...middlewares);
    } else if(route.method === 'post') {
      koaRouter.post(route.path, ...middlewares);
    } else if(route.method === 'put') {
      koaRouter.put(route.path, ...middlewares);
    } else if(route.method === 'delete') {
      koaRouter.delete(route.path, ...middlewares);
    } else {
      koaRouter.all(route.path, ...middlewares);
    }
  })

  return koaRouter;
}