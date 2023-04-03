import { Middleware } from "koa";
import { sign, verify } from 'jsonwebtoken';
import dotEnv from 'dotenv';
import path from 'path';
dotEnv.config({
  path: path.resolve(__dirname, '../.env')
});

export const authMiddleware: Middleware = (ctx, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';

  if (!JWT_SECRET) {
    return next();
  }
  const authorizationInHeader = ctx.request.header.authorization || ctx.request.header.Authorization as string;

  if (authorizationInHeader) {
    verify(authorizationInHeader, JWT_SECRET, (err, decoded) => {
      if (err) {
        ctx.status = 401;
        return ctx.body = {
          message: 'Unauthorized2'
        }
      } else {
        return next();
      }
    })
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Unauthorized1'
    }
  }
}

export const signToAuth = (payload: Record<string, any>) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';
  const jwt_expire = process.env.JWT_EXPIRE || '7d';

  const token = sign(payload, JWT_SECRET, { expiresIn: jwt_expire });
  return token;
}