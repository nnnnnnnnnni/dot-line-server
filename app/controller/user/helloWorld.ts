import { Response } from "@utils/response";
import { Context } from "koa";
import { signToAuth } from "middlewares";

export const helloWorld = async (ctx: Context) => {

  console.log(ctx.user?._id)

  return ctx.body = new Response(200, 'hello world', signToAuth({ id: 1, name: 'test' }))
}