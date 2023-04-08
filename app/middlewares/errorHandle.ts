import { Response } from "@utils/response";
import { Context, Next } from "koa";

export const errorHandle = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    console.log(err)
    return ctx.body = new Response(500, 'Server Error', null)
  }
};
