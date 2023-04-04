import { Middleware } from "koa";
import { sign, verify } from 'jsonwebtoken';
import { Response } from "../utils/response";

export const authMiddleware: Middleware = (ctx, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const authorizationInHeader = ctx.request.header.authorization || ctx.request.header.Authorization as string;

  if (authorizationInHeader) {
    verify(authorizationInHeader, JWT_SECRET, (err, decoded) => {
      if (err) {
        return ctx.body = new Response(401, err.message, null)
      } else {
        return next();
      }
    })
  } else {
    return ctx.body = new Response(401, 'Unauthorized', null)
  }
}

export const signToAuth = (payload: Record<string, any>) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';
  const jwt_expire = process.env.JWT_EXPIRE || '7d';

  const token = sign(payload, JWT_SECRET, { expiresIn: jwt_expire });
  return token;
}