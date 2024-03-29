import { Middleware } from "koa";
import { sign, verify } from 'jsonwebtoken';
import { Response } from "@utils";

export const authMiddleware: Middleware = async (ctx, next) => {
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
        ctx.user = decoded;
        return next();
      }
    })
  } else {
    return ctx.body = new Response(401, 'Unauthorized', null)
  }
}

export const explainUserMiddleware: Middleware = async (ctx, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';

  const authorizationInHeader = ctx.request.header.authorization || ctx.request.header.Authorization as string;

  if (authorizationInHeader && JWT_SECRET) {
    verify(authorizationInHeader, JWT_SECRET, (err, decoded) => {
      if (!err) {
        ctx.user = decoded;
      }
    })
  }
  await next();
}

export const signToAuth = (payload: Record<string, any>) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';
  const jwt_expire = '30d';

  const token = sign(payload, JWT_SECRET, { expiresIn: jwt_expire });
  return token;
}