import { Context, Next } from "koa";
import { Response } from "../utils/response";

export const errorHandle = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    return ctx.body = new Response(500, 'Server Error', null)
  }
};
